import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  basic = 0; advance = 0;preBasic = 0; preAdvance = 0; char = '';
  array = []; mainArray = []; pre = '';
  show:boolean=true;
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.getUserList();
  // $(document).ready(function(){
  //   $("button").click(function(){
  //     $(".advance").fadeToggle("slow");
  //     $(".basic").fadeToggle("slow");
  //   });
  // });
  }
  values: any = '';
  //when user hit in search button it works
onKeyUp(event: any) { 
  //storing value in previous
  this.pre = this.values;
  this.values = event.target.value;
  if (this.values.length < this.pre.length) {//when user hit back space
    this.array = this.mainArray;
  }
  //method for name filtering
  var checkName = (item: any) => {
    // console.log('item ',item.firstName.toLowerCase(),'  value ',this.values.toLowerCase())
    return item.firstName.toLowerCase().startsWith(this.values.toLowerCase());
  }
  //array filter
  this.array = this.array.filter(function (item) {
    // console.log('item',item);
    return checkName(item);
  });
  for (var i = 0; i < this.array.length; i++) {
    this.char = this.array[i].service;
    if (this.char == 'basic' || this.char == 'Basic' || this.char == 'BASIC') {
      this.preBasic++;
    } else {
      this.preAdvance++;
    }
  }
  this.basic = this.preBasic, this.advance = this.preAdvance;
  this.preBasic = 0, this.preAdvance = 0;

};
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
  acceptance(){
    this.show=!this.show;
    // this.router.navigate(['acceptance'])
  }
}
