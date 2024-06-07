import { User } from "./../models/user.model";
import { baseUrl, httpOptions } from "./../api/base.url";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { StorageService } from "./storage.service";

interface AuthResponse {
  accessToken: string;
  expDate: string;
  email: string;
  name: string;
  role: number;
  msg: string;
  password: string;
  success:boolean;
  data:any;
  permission: {};
}

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private user: User;
  role =0;
  accessToken: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    
    if(storageService.getCurrentUser() && this.storageService !==undefined) {
      this.role = JSON.parse(storageService.getCurrentUser()).data.role;
      
    }
  }


  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${baseUrl}/auth/login`,
        { email: email, password: password },
      );
  }

  // isLoggedIn() {
  //   const user = JSON.parse(localStorage.getItem("user")!) as User;
  //   const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  //   // const expDate = JSON.parse(sessionStorage.getItem('expiration'));
  //   if (user) {
  //     const token = accessToken;
  //     //    const sExpDate = expDate;
  //     //  (new Date(sExpDate))
  //     if (token) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }


  
  getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.storageService.getCurrentUser()).accessToken;

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }

  updateBranch(branchData: any) {
    const headers = this.getHeaders();
    return this.http.put<any>(
      
      `${baseUrl}/auth/update-branch`,

      branchData, { headers });
  }

  logout() {
 localStorage.clear();
 sessionStorage.clear();

    this.router.navigate(["account/login"]);
  }
}
