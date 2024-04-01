import { User } from './../models/user.model';
import { baseUrl, httpOptions } from './../api/base.url';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserManagementService } from './user-management.service';







interface AuthResponse {
  accessToken:string,
  expDate:string,
  email:string,
  name:string,
  role:number,
  msg:string,
  password:string,
  permission:{
    
  }
  }

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private accessToken: string | null = null;
  private expDate: string | null = null;

  private user:User;
  constructor
  (
    private router: Router,
    private http: HttpClient,
    private readonly userMangementService :UserManagementService
  ) { }

    login(email: string, password: string) {
    

      
      return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {"email": email, "password": password}, httpOptions)
      .pipe(tap((res)=> {

       
       return this.userMangementService.setCurrentUser(res);
      

        
      }))
       
    }

    isLoggedIn() {
      const user = JSON.parse(localStorage.getItem('user')!) as User;
      if (user) {
        const token = user.accessToken;
        const sExpDate = user.expDate;
        console.log(sExpDate)
        if (token && sExpDate && new Date().getTime() < new Date(sExpDate).getTime())
        {
          return true;
        }
      }
      return false;
    }

 

    logout() {
      localStorage.removeItem('user');
      this.router.navigate(['account/login']);
    }
}