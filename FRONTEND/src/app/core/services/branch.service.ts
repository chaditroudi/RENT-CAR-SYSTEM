import { StorageService } from "./storage.service";
import { baseUrl } from './../api/base.url';
// src/app/services/branch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {


  accessToken: any;  private branchSource = new BehaviorSubject<any[]>([]);
  public branchs$ = this.branchSource.asObservable();

  createBranch(data: any) : Observable<any> {
    
    const headers = this.getHeaders();

    return this.http.post(`${baseUrl}/branch`,data,{headers}).pipe(tap((newContract) =>{
      const Contracts = this.branchSource.value;
      Contracts.push(newContract);
      this.branchSource.next(Contracts);
    }))
    ;
  
  }

  constructor(private http: HttpClient,private storageService:StorageService) {}

  getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.storageService.getCurrentUser()).accessToken;

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }


  getAllBranches() {
    const headers = this.getHeaders();
    return this.http.get<any>(`${baseUrl}/branch`,{headers}).subscribe((data)=> {
      this.branchSource.next(data);
      
    });
  }
}
