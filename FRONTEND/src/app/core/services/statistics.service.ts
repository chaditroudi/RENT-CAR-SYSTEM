import { StorageService } from 'src/app/core/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { baseUrl } from '../api/base.url';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private contractSource = new BehaviorSubject<any[]>([]);
  contracts$ = this.contractSource.asObservable();


  private carSource = new BehaviorSubject<any[]>([]);
  cars$ = this.carSource.asObservable();

  public accessToken ='';

  public headers :HttpHeaders;
  constructor(private http: HttpClient,private userMangementServ:StorageService) { 

    this.headers = this.getHeaders();
  }


  
  getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.userMangementServ.getCurrentUser()).accessToken;

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }

  
  countContractOpen() {
    const headers = this.headers;
    
    return this.http.get<any>(`${baseUrl}/statistics/count-open-contract` ,{headers});

  }

  countContractClosed() {
    const headers = this.headers;
    
    return this.http.get<any>(`${baseUrl}/statistics/count-closed-contract` ,{headers});

  }


  
  countRentedCar() {
    const headers = this.headers;
    
    return this.http.get<any>(`${baseUrl}/statistics/count-rented-car` ,{headers});

  }

  countAvailableCar() {
    const headers = this.headers;
    
    return this.http.get<any>(`${baseUrl}/statistics/count-available-car` ,{headers});

  }
  getRentalCarsHistory() {
    const headers = this.headers;
    
    return this.http.get<any>(`${baseUrl}/statistics/get-rental-history
    ` ,{headers})

  }



  
  

  getContracts() {
    const headers = this.headers;
    
    return this.http.get<any[]>(`${baseUrl}/contract` ,{headers}).subscribe(data => {
      this.contractSource.next(data);
    })


  }


  backups:any;
  getContractsBackup() {

    const headers = this.headers;
    
    return this.http.get<any[]>(`${baseUrl}/contract/backups-contracts` ,{headers}).subscribe((data) => {
      this.contractSource.next(data)
  });
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

      this.contractSource.next(newData);
    }))}
   



}



