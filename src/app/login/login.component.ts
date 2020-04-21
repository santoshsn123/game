import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username='';
  groupId='';
  constructor(private common:CommonService,private router:Router) { }

  ngOnInit() {
    this.common.loginerror.subscribe(error=>{
      console.log(error);
      alert(error);
    });

    if(localStorage.getItem('userLoggedIn'))
    {
      this.router.navigate(['table']);
    }
    // this.common.loginsuccess.subscribe(error=>{
    //   alert(error);
    // });

   
  }
  getLoggedIn=()=>{
    this.common.getloggedIn({username:this.username,groupId:this.groupId});
  }
}
