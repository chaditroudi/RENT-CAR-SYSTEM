import { io } from 'socket.io-client';
// notification.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../api/base.url';
import { Car } from '../models/car.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  accessToken: string;
 
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  
  public notifications$= this.notificationsSubject.asObservable();


  socket: any;
  constructor(
    private http: HttpClient,private storageService:StorageService
  ) { 
    this.socket = io('http://localhost:3200');
  }



  getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.storageService.getCurrentUser()).accessToken;

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }
  



  listen(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('send-notification', (data) => {
        subscriber.next(data);
      });
    });
  }
  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }


  markAsRead(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${baseUrl}/notification/${id}`,{}, {headers});
  }

  getNotifications() {
    const headers = this.getHeaders();
     this.http.get(`${baseUrl}/notification/get-notifications`, {headers}).subscribe((res:any[])=>{
      this.notificationsSubject.next(res);


    });
  }

  markAllAsRead(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${baseUrl}/notification/read/all`, {},{headers});
  }

  deleteNotification(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${baseUrl}/notification/${id}`,{headers});
  }

  deleteAllNotifications(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${baseUrl}/notification/delete/all`,{headers});
  }
  
}
