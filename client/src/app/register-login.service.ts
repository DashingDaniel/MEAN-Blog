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
}
