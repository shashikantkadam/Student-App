import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  logInToApp(userId:string, password:string){
    this.authService.logIn(userId,password)
    this.router.navigate(['/dashboard'])
    
    
   }
  
  }


