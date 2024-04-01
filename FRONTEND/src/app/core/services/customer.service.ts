import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseUrl } from '../api/base.url';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerSource = new BehaviorSubject<any[]>([]);
  public customers$ = this.customerSource.asObservable();

  constructor(private http: HttpClient) { }

  fetchAllCustomers(): void {
    this.http.get<any[]>(`${baseUrl}/customer`).subscribe(customers => {
      this.customerSource.next(customers);
    });
  }

  createCustomer(customerData: any): Observable<any> {
    return this.http.post(`${baseUrl}/customer`, customerData).pipe(
      tap((newCustomer) => {
        console.log("hii",newCustomer);
        console.log("hii",this.customerSource.getValue());
                this.customerSource.next([...this.customerSource.getValue(), newCustomer]);
        console.log(newCustomer);
      })
    );
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<any>(`${baseUrl}/customer/${id}`);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${baseUrl}/customer/${customer._id}`, customer)
      .pipe(
        map(updatedCustomer => {
          console.log('Customer updated successfully:', updatedCustomer);
          return updatedCustomer;
        }),
     
      );
  }

  
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/customer/${id}`).pipe(tap(()=> {
      const newData = this.customerSource.value.filter(item => item._id !==id);
      console.log("new data=",newData);

      this.customerSource.next(newData);
    }))}
}