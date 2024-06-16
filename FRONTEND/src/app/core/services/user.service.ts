import { User } from "./../models/user.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { baseUrl } from "../api/base.url";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private customerSource = new BehaviorSubject<any[]>([]);
  public customers$ = this.customerSource.asObservable();

  constructor(private http: HttpClient) {}

  fetchAllCustomers(): void {
    this.http.get<any[]>(`${baseUrl}/user`).subscribe((customers) => {
      this.customerSource.next(customers);
    });
  }
  fetchBranchUser(): void {
    this.http
      .get<any[]>(`${baseUrl}/user/branch-user`)
      .subscribe((customers) => {
        this.customerSource.next(customers);
      });
  }

  createCustomer(customerData: any): Observable<any> {
    return this.http.post(`${baseUrl}/user`, customerData).pipe(
      tap((newCustomer) => {
        this.customerSource.next([
          ...this.customerSource.getValue(),
          newCustomer,
        ]);
        newCustomer;
      })
    );
  }

  getCustomerById(id: string): Observable<User> {
    return this.http.get<any>(`${baseUrl}/user/${id}`);
  }

  updateCustomer(customer: User): Observable<User> {
    return this.http
      .put<User>(`${baseUrl}/user/${customer._id}`, customer)
      .pipe(
        map((updatedCustomer) => {
          return updatedCustomer;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/user/${id}`).pipe(
      tap(() => {
        const newData = this.customerSource.value.filter(
          (item) => item._id !== id
        );

        this.customerSource.next(newData);
      })
    );
  }
}
