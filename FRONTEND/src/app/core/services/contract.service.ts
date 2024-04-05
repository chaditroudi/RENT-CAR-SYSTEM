import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../models/contract.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { baseUrl } from '../api/base.url';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private contractSource = new BehaviorSubject<any[]>([]);
  contracts$ = this.contractSource.asObservable();
  public accessToken ='';

  public headers :HttpHeaders;
  constructor(private http: HttpClient,private userMangementServ:StorageService) { 

    this.headers = this.getHeaders();
  }


  
  getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.userMangementServ.getCurrentUser()).accessToken;
    console.log(this.accessToken,"acctoken")

    console.log("token",this.accessToken)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }

  




  getContracts() {
    const headers = this.headers;
    
    return this.http.get<any[]>(`${baseUrl}/contract` ,{headers}).subscribe(data => {
      this.contractSource.next(data);
    })


  }


  get(id: any) :Observable<Object> {
    return this.http.get(`${baseUrl}/contract/${id}`);
  } 

  

  create(data: any) {
    return this.http.post(`${baseUrl}/contract`,data).pipe(tap((newContract) =>{
      const Contracts = this.contractSource.value;
      Contracts.push(newContract);
      this.contractSource.next(Contracts);
    }))
    ;
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/contract/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/contract/${id}`).pipe(tap(()=> {
      const newData = this.contractSource.value.filter(item => item._id !==id);
      console.log("new data=",newData);

      this.contractSource.next(newData);
    }))}
   



}



