import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  private currentUser : User | null = null;
  private isLoggedIn ="NOT_CONNECTED";
  private currentUserSource = new BehaviorSubject<User | null>(this.currentUser);
  public currentUser$:Observable<User | null> = this.currentUserSource.asObservable();
  static isAdmin : false;

  role:number; 
  constructor() { 




  }


    setToken(accessToken:string) {

    sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
   // sessionStorage.setItem('expiration', JSON.stringify(expiration));

  }

  setCurrentUser(user:any) {
    this.currentUser = user;
    this.currentUserSource.next(this.currentUser);
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedIn = "CONNECTED";
    localStorage.setItem('user_connected',this.isLoggedIn);
  }

  getIsLoggedIn() {
    return localStorage.getItem('user_connected');

  }

  getCurrentUser():any | null {
      return localStorage.getItem('user');
    
    
  }



  storeUserRole(role: string) {
    localStorage.setItem('user_role', role); 
  }

 

  getRole() {
    return this.role = JSON.parse(this.getCurrentUser()).data.role;

  }
  getBranchName() {
    return JSON.parse(this.getCurrentUser()).branch_name;
  }
}

