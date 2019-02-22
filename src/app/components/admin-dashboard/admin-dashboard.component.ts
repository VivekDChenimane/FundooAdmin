import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Router } from "@angular/router";
declare var $: any;@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  basic = 0; advance = 0;preBasic = 0;  char = '';
  array = []; mainArray = []; 
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    try {
    this.httpService.getRequest('user/getAdminUserList').subscribe(data => {
      console.log(data);
      this.mainArray = data['data']['data'];
      this.array = this.mainArray;
      for (var i = 0; i < this.array.length; i++) {
        this.char = this.array[i].service;
        if (this.char == 'basic' || this.char == 'Basic' || this.char == 'BASIC') {
          this.basic++;
        } else {
          this.advance++;
        }
      }
      console.log('basic user is ', this.basic, ' advane user is', this.advance);
  
  
    }, err => {
      console.log('error in get user list');
    });
  } catch (error) {
   console.log('error in dashboard');   
  }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
