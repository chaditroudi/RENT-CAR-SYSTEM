import { User } from './../models/user.model';
import { baseUrl, httpOptions } from './../api/base.url';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';







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



  private user:User;
  constructor
  (
    private router: Router,
    private http: HttpClient,
    private readonly userMangementService :StorageService
  ) { }

    login(email: string, password: string) {
    

      
      return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {"email": email, "password": password}, httpOptions)
      .pipe(tap((res)=> {

       

        this.userMangementService.setToken(res.accessToken,res.expDate);
       return this.userMangementService.setCurrentUser(res);

      

        
      }))
       
    }

    isLoggedIn() {
      const user = JSON.parse(localStorage.getItem('user')!) as User;
      const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
      const expDate = JSON.parse(sessionStorage.getItem('expiration'));
      if (user) {
        const token = accessToken;
        const sExpDate = expDate;
        console.log(sExpDate)
        if (token && sExpDate && new Date().toLocaleString() < new Date(sExpDate).toLocaleString())
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