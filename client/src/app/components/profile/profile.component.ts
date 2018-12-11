import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/register-login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  passwordChange:boolean = false;
  form = new FormGroup({
    'user_password': new FormControl('', Validators.required),
    'user_new_password': new FormControl('',Validators.required)
  })
  constructor(private nav: NavbarService, private router: Router, private registerLoginService: RegisterLoginService) { }

  ngOnInit() {
    this.nav.show();
    if(localStorage.getItem('token')==null){
      this.router.navigate([""])
    }

    this.registerLoginService.getUserDetails()
    .subscribe((results:any)=>{
      this.userDetails = results[0];
    })
  }

  togglePasswordChange(){
    this.passwordChange = !this.passwordChange;
  }
  changePassword(){
    this.registerLoginService.changeUserPassword(this.form.get('user_password').value, this.form.get('user_new_password').value)
    .subscribe((result: any)=>{
      console.log(result.msg);
      if(result.msg == 'Password Updated'){
        this.passwordChange = false;
      }else if(result.msg == 'Password incorrect'){
        alert("Check your password again")
      }else{
        alert('Something went wrong');
      }
    })
  }


}
