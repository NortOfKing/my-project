 
import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GetGreetingService } from '../get-greeting.service';
import { HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm: FormGroup;
  submitted = false;
  token: string; public parameterValue: string;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private getGreeting: GetGreetingService,
              private _activatedRoute: ActivatedRoute) { 
    
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    }); 
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.token="";
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
      (response:any) => {
        // handle successful login response
        localStorage.setItem('isLoggedIn', 'true'); 
        console.log(response.data.token);
        this.token=response.data.token;
        localStorage.setItem('token', this.token); 
        //this.getGreeting.getGreeting(this.token);
        this.getGreeting.getGreeting(this.token).subscribe(
          (response:any) => {           
            // handle successful login response
            console.log(response);
            localStorage.setItem('Greeting', response.data);  
         
            const queryParams = { data: response.data ,token: this.token};        
            this.router.navigate(['/home'],{queryParams: queryParams});
         },
          (error) => {
            // handle login error
            console.error(error);
            //this.errorMessage = 'Invalid username or password';
          }
    
        );
        
      },
      (error) => {
        // handle login error
        console.error(error);
        //this.errorMessage = 'Invalid username or password';
      }
    ); 
    
  
   
   
      
    

  }
}