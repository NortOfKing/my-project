import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from "rxjs/operators";
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetGreetingService {
;
  private readonly apiUrl = 'http://66.70.229.82:8181/GetGreeting'; 

    constructor(private http: HttpClient,private auth: AuthenticationService) { 
     
    }
    getGreeting(token:string) {
      const headers = new HttpHeaders({
        'x-user-token':  token
      })
      console.log('token2:'+token);
      return this.http.get(`${this.apiUrl}`, { headers })
      .pipe(
        map(GetGreeting => {
           
          return GetGreeting;
        })        
      );;
    }    
}
