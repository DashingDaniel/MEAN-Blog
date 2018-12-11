import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { RegisterLoginService } from 'src/app/register-login.service';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  onRegister = false;
  user_email: string;
  // user_name: string;
  user_password: string;
  // user_phone: number;
  // gender_option: string;
  // user_gender: string;
  form = new FormGroup({
    'user_name': new FormControl('',Validators.required),
    'user_password': new FormControl('', Validators.required),
    'user_phone': new FormControl('', Validators.pattern( /^\d{10}$/)),
    'user_email': new FormControl('',[Validators.email, Validators.required])
  })
  constructor(private nav: NavbarService, private registerLoginService: RegisterLoginService, private router: Router, private socialAuthService: AuthService) { }

  ngOnInit() {
    this.nav.hide();
    
  }
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
        const newData = {
          user_name: userData.name,
          user_email: userData.email
        }

        this.registerLoginService.onGoogleLogin(newData)
        .subscribe((result:any)=>{
          const token = result.token;
          localStorage.setItem('token', token);
          if(localStorage.getItem('token')){
            this.router.navigate(["home"]);
          }
          console.log('Logged in: ',result);
        })
      }
    );
  }

  showRegister(){
    this.onRegister = true;
  }

  onRegisterClick(){
    if (this.form.invalid) {
      return;
    }
    // console.log(register.value.user_name)
    // if(this.gender_option == '1'){
    //   this.user_gender = 'male';
    //   console.log(this.user_gender)
    //   // console.log('male')
    // }else{
    //   this.user_gender = 'female';
    //   console.log(this.user_gender);
    //   // console.log('female')
    // }

    const newUser = {
      user_name: this.form.get('user_name').value,
      user_email: this.form.get('user_email').value,
      user_password: this.form.get('user_password').value,
      user_phone: this.form.get('user_phone').value
      // user_gender: this.user_gender
    }

    this.registerLoginService.onRegisterUser(newUser)
    .subscribe((result:any)=>{
      console.log(result.msg);
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
