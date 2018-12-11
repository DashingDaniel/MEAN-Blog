import { Injectable } from '@angular/core';
import {  HttpHeaders,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(private http: HttpClient) { }

  onRegisterUser(newUser){
    return this.http.post('http://localhost:3000/api/register', newUser)
  }

  onLoginUser(user){
    return this.http.post('http://localhost:3000/api/login',user)
  }

  onGoogleLogin(newUser){
    return this.http.post('http://localhost:3000/api/loginGoogleUser',newUser);
  }

  getUserDetails(){
    const httpOptions = new HttpHeaders({      
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get('http://localhost:3000/api/getUserInfo',{headers: httpOptions})

  }

  changeUserPassword(user_password, user_new_password){
    const httpOptions = new HttpHeaders({      
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const uploadData = new FormData();
    uploadData.append('user_password', user_password);
    uploadData.append('user_new_password', user_new_password);

    return this.http.post('http://localhost:3000/api/changePassword',uploadData, {headers: httpOptions})
  }
}
