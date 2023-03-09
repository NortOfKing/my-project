import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket,WebSocketSubject  } from 'rxjs/webSocket';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: string;token: string; private socket: WebSocketSubject<any>;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // params is an object that contains all query parameters
      this.data = params['data'];
      this.token = params['token'];      
    });
  }// convenience getter for easy access to form fields
 
  logout(){
   
    this.route.queryParams.subscribe(params => {
      // params is an object that contains all query parameters
      this.data = params['data'];
      this.token = params['token'];
      console.log("Token have: "+this.token);
      this.socket = webSocket({
        url: 'ws://66.70.229.82:8181/?'+this.token,
        deserializer: msg => msg       
      });
      this.socket.subscribe(
        message => console.log('Received message:', message),
        error => console.error('Error occurred:', error),
        () => console.log('WebSocket connection closed')
      );
      this.socket.subscribe(
        close => {console.log('WebSocket connection closed');this.authenticationService.logout();this.router.navigate(['/login'])}
      );
    });
  }

}
