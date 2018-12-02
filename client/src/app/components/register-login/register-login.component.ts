import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { RegisterLoginService } from 'src/app/register-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  onRegister = false;
  user_email: string;
  user_name: string;
  user_password: string;
  user_phone: number;
  gender_option: string;
  user_gender: string;
  constructor(private nav: NavbarService, private registerLoginService: RegisterLoginService, private router: Router) { }

  ngOnInit() {
    this.nav.hide();
    
  }

  showRegister(){
    this.onRegister = true;
  }

  onRegisterClick(){
    if(this.gender_option == '1'){
      this.user_gender = 'male';
      console.log(this.user_gender)
      // console.log('male')
    }else{
      this.user_gender = 'female';
      console.log(this.user_gender);
      // console.log('female')
    }

    const newUser = {
      user_name: this.user_name,
      user_email: this.user_email,
      user_password: this.user_password,
      user_phone: this.user_phone,
      user_gender: this.user_gender
    }

    this.registerLoginService.onRegisterUser(newUser)
    .subscribe((result:any)=>{
      console.log(result.msg);
      if(this.user_email == undefined || this.user_phone == undefined || this.user_password == undefined ||this.user_gender == undefined || this.user_name == undefined){
        alert("Fill all the details");
      }
      if(result.msg == 'User added successfully'){
        this.onRegister = false;
      }
    })
  }

  onLoginClick(){
    const user = {
      user_email: this.user_email,
      user_password: this.user_password
    }

    this.registerLoginService.onLoginUser(user)
    .subscribe((result:any)=>{
      // console.log(result);
      if(result.msg == 'Check your credentials'){
        alert('Check your credentials');
      }else{
        const token = result.token;
        localStorage.setItem('token',token);
        console.log('From localstorage', localStorage.getItem('token'))
        this.router.navigate(["home"]);
      }
      
    })

  }

}
