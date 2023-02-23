import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iadmin } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInStatus : boolean = false;
  public adminAuth:Iadmin= {
    userId: 'admin', 
    password: 'admin@123'
  }
  constructor() { }

  isAuthenticated(): Observable<boolean>{
    return new Observable((observer)=>{
        this.loggedInStatus = localStorage.getItem('token') ? true : false;
        observer.next(this.loggedInStatus)
    })
}


  logIn(userId:string, password:string){

    if(this.adminAuth.userId == userId && this.adminAuth.password == password ){
      this.loggedInStatus = true
      let token = 'token';
      localStorage.setItem('token',token)
    }else{
      alert('please enter valid userId and password..!!!')
      this.loggedInStatus = false
    }  
  }

  logOut(){
    this.loggedInStatus = false
   localStorage.removeItem('token') 
  }
}