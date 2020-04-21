import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  connect = this.socket.fromEvent<Document>('connect');
  loginerror = this.socket.fromEvent<Document>('loginerror');
  loginsuccess = this.socket.fromEvent<Document>('loginsuccess');
  newUser = this.socket.fromEvent<Document>('newUser');
  cards_distributing = this.socket.fromEvent<Document>('cards_distributing');
  cards_distributed = this.socket.fromEvent<Document>('cards_distributed');
  
  constructor(private socket: Socket) { }

  getloggedIn=(data)=>{
    this.socket.emit('login',data);
  }

  logout=(data)=>{
    this.socket.emit('logout',data);
  }
  resetsocketIdDetails=(data)=>{
    this.socket.emit('resetsocketIdDetails',data);
  }
}
