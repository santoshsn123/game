import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CommonService } from './common.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  fetchedData;
  constructor(private socket: Socket,private common:CommonService,private router:Router) { 
    // console.log();
  }
  ngOnInit() {
    // console.log("loaded here ");
    
    this.common.loginsuccess.subscribe(data=>{
      this.fetchedData = data;
      // {groupId:this.fetchedData.groupId,socketId:this.fetchedData.id}
      localStorage.setItem('userLoggedIn',JSON.stringify(this.fetchedData));
      this.router.navigate(['table']);
    })
  }

}
