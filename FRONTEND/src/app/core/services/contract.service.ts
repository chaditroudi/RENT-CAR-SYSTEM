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

    return new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    })
  }
  

  getContractById(id:string) :Observable<Contract> {
    const headers = this.getHeaders();
    
    return this.http.get<Contract>(`${baseUrl}/contract/${id}` ,{headers});

  }

  getAutoInc() {
    const headers = this.getHeaders();
    
    return this.http.get<any>(`${baseUrl}/contract/autoinc` ,{headers});

  }

  countContractOpen() {
    const headers = this.getHeaders();
    
    return this.http.get<any>(`${baseUrl}/contract/count-open-contract` ,{headers});

  }




  
  

  getContracts() {
    const headers = this.getHeaders();
    
    return this.http.get<any[]>(`${baseUrl}/contract` ,{headers}).subscribe(data => {
      this.contractSource.next(data);
    })


  }

  
  getContractsByBranch() {
    const headers = this.getHeaders();
    
    return this.http.get<any[]>(`${baseUrl}/contract/contract-branch` ,{headers}).subscribe(data => {
      this.contractSource.next(data);
    })


  }


  

  backups:any;
  getContractsBackup(id:string) {

    const headers = this.getHeaders();
    
    return this.http.get<any[]>(`${baseUrl}/contract/backups-contracts/${id}` ,{headers}).subscribe((data) => {
      
      this.contractSource.next(data)
  });
}


  get(id: any) :Observable<Object> {
    const headers = this.getHeaders();

    return this.http.get(`${baseUrl}/contract/${id}`,{headers});
  } 

  getImages(contractId: string): Observable<any> {
    return this.http.get(`${baseUrl}/contract/get-images/${contractId}`);
  }

  create(data: any) {
    const headers = this.getHeaders();

    return this.http.post(`${baseUrl}/contract`,data,{headers}).pipe(tap((newContract) =>{
      const Contracts = this.contractSource.value;
      Contracts.push(newContract);
      this.contractSource.next(Contracts);
    }))
    ;
  }

  getFeaturesByContract(id:string) :Observable<any> {
    return this.http.get(`${baseUrl}/features/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put(`${baseUrl}/contract/${id}`, data,{headers});
  }
  updateImage(id: any, data: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put(`${baseUrl}/contract/update-image/${id}`, data,{headers});
  }

  delete(id: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.delete(`${baseUrl}/contract/${id}`,{headers}).pipe(tap(()=> {
      const newData = this.contractSource.value.filter(item => item._id !==id);

      this.contractSource.next(newData);
    }))}
   






    weeklyReports() {
      const headers = this.getHeaders();
      return this.http.get(`${baseUrl}/contract/weekly-reports`,{headers});
    }
    monthlyReports(){
      const headers = this.getHeaders();
      return this.http.get(`${baseUrl}/contract/monthly-reports`,{headers});
    }
    annualReports(){
      const headers = this.getHeaders();
      return this.http.get(`${baseUrl}/contract/annual-reports`,{headers});
    }

    countStatusContract() {
      const headers = this.getHeaders();
      return this.http.get(`${baseUrl}/contract/count-status`,{headers});
    }


    getRentalCarsHistory() {
      const headers = this.headers;
      
      return this.http.get<any>(`${baseUrl}/contract/get-rental-history
      ` ,{headers})
  
    }
  
}



