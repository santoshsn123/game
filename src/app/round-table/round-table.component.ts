import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-round-table',
  templateUrl: './round-table.component.html',
  styleUrls: ['./round-table.component.css']
})
export class RoundTableComponent implements OnInit {
  groupid = '';
  loginData;
  allUsers;
  distributing: boolean = false;
  cardsArray;
  mydetails;
  constructor(private common: CommonService, private router: Router) { }

  ngOnInit() {
    
    this.common.cards_distributing.subscribe(distributing => this.distributing = true);
    this.common.cards_distributed.subscribe(cards => {
      this.distributing = false;
      this.cardsArray = cards;
      console.log(this.cardsArray);
      this.allUsers = cards;
      this.setOtherUsers();
    });
    if (!localStorage.getItem('userLoggedIn')) {
      this.router.navigate(['login']);
    }
    else {
      this.loginData = JSON.parse(localStorage.getItem('userLoggedIn'));
      console.log(this.loginData);
    }
    this.common.newUser.subscribe(userdata => {
      console.log("New Users are here:- ", userdata);
      this.distributing = false;
      this.allUsers = userdata;
      this.setOtherUsers();
    });


    this.common.connect.subscribe(data => {
      if (localStorage.getItem('userLoggedIn')) {
        let data = JSON.parse(localStorage.getItem('userLoggedIn'));
        this.common.resetsocketIdDetails({ userRefId: data.userRefId, groupRefId: data.groupRefId })
      }
    });
    this.common.loginsuccess.subscribe(data => {
      this.loginData = data;
      this.groupid = this.loginData.groupId;
    })
  }

  logout = () => {
    let data = JSON.parse(localStorage.getItem('userLoggedIn'));
    this.common.logout({ userRefId: data.userRefId, groupRefId: data.groupRefId });
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['login']);
  }

  setOtherUsers = () => {
    let ind;
    this.allUsers.forEach((user, index) => {
      if (this.loginData.userRefId == user.userRefId) {
        ind = index;
        this.mydetails = user;
        console.log(this.mydetails);
        return null;
      }
      else {
        return user;
      }
    });
    this.allUsers.splice(ind, 1);
  }

}
