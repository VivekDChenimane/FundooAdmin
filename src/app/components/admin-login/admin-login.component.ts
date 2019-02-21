import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from "@angular/router";
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  getErrorMessage ='';
  constructor(private httpservice:HttpService, public router: Router) { }

  ngOnInit() {
  }

  email = new FormControl('',[Validators.email,Validators.required]);
  password = new FormControl('',[Validators.required,Validators.minLength(6)]);

  emailError() {
    return this.email.hasError('email') ? 'Not a valid email' :
      this.email.hasError('required') ? 'email is required' : ''
  }
  passwordError(){
    return this.password.hasError('minlength') ? 'should be of minimum of 6 digits' :
      this.password.hasError('required') ? 'password cannot be empty':
      ''
  }
  submit(){
    try{
      if(this.email.value=='' || this.password.value=='' ){
        this.getErrorMessage = 'Feild is required';
        return;
      }else if(this.emailError() && this.passwordError()){
        return;
      } 
      else{
        $.ajax({
          url: "http://34.213.106.173/api/user/adminLogin",
          type: "post",
          dataType: "json",
          data: JSON.stringify({
            "email": this.email.value,
            "password": this.password.value
          }),
          contentType: 'application/json; charset=utf-8',
          success: (data: any) => {
            // console.log(data, 'data is', data['id']);
            localStorage.setItem('admintoken', data['id']);
            this.router.navigate(['adminDashboard'])

          },
          error:(jqXHR, textStatus, errorThrown) =>{
            this.getErrorMessage="unAuthorized User";
            // console.log('error data ', textStatus);
          },

          timeout: 120000,
        });
      }
    }
    )
  }
}
