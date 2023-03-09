import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private token: string;

    private readonly apiUrl = 'http://66.70.229.82:8181/Authorize';
  
    constructor(private http: HttpClient) { }
  
    login(email: string, password: string) {
      return this.http.post(`${this.apiUrl}`, { email, password })
      .pipe(
        map(user => {
           
          return user;
        })        
      );
    }
    logout(){ localStorage.removeItem('token');}
    setToken(token: string) {
      this.token = token;
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
    test() {
      
    }
  }