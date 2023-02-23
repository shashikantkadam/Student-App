import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }
  OnLogOut(){
    this.authservice.logOut();
    this.router.navigate(['/'])
  }

}
