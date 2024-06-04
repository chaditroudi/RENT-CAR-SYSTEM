import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { io } from "socket.io-client";
import { Notification } from '../models';




@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket = io(environment.SOCKET_URL);
  public message$: BehaviorSubject<string> = new BehaviorSubject('');




  constructor() { 
  }



  
  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('notification', message);
  }

  public getNewMessage = () => {
    this.socket.on('notification', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}