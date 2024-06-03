import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseUrl } from '../api/base.url';
import { Customer } from '../models/customer.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerSource = new BehaviorSubject<any[]>([]);
  public customers$ = this.customerSource.asObservable();
  accessToken="";

  constructor(private http: HttpClient,private storageService:StorageService) { }


  
  getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.storageService.getCurrentUser()).accessToken;

    return new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    })
  }
  

  fetchAllCustomers(): void {
    const headers =this.getHeaders();
    this.http.get<any[]>(`${baseUrl}/customer`,{headers}).subscribe(customers => {
      this.customerSource.next(customers);
    });
  }
  fetchAllCustomersByBranch(): void {
    const headers =this.getHeaders();

    this.http.get<any[]>(`${baseUrl}/customer/customers-branch`,{headers}).subscribe(customers => {
      this.customerSource.next(customers);
    });
  }

  createCustomer(customerData: any): Observable<any> {
    const headers =this.getHeaders();

    return this.http.post(`${baseUrl}/customer`, customerData,{headers}).pipe(
      tap((newCustomer) => {
       
                this.customerSource.next([...this.customerSource.getValue(), newCustomer]);
        (newCustomer);
      })
    );
  }

  getCustomerById(id: string): Observable<Customer> {
    const headers =this.getHeaders();

    return this.http.get<any>(`${baseUrl}/customer/${id}`,{headers});
  }

  updateCustomer(customerId:string,customer: Customer): Observable<Customer> {
    const headers =this.getHeaders();

    return this.http.put<Customer>(`${baseUrl}/customer/${customerId}`, customer,{headers})
      .pipe(
        map(updatedCustomer => {
          return updatedCustomer;
        }),
     
      );
  }

  
  delete(id: any): Observable<any> {
    const headers =this.getHeaders();

    return this.http.delete(`${baseUrl}/customer/${id}`,{headers}).pipe(tap(()=> {
      const newData = this.customerSource.value.filter(item => item._id !==id);

      this.customerSource.next(newData);
    }))}
}