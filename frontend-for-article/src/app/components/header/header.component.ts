import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean = this.auth.isLoggedIn();
  user: any;
  welcomeName;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedin = this.auth.isLoggedin;
    this.user = this.auth.getUserFromLocalStorage();
    this.welcomeName = this.user.firstname;
    // Subscribe to login state changes using the event emitter
    this.auth.loginStateChanged.subscribe((isLoggedIn: boolean) => {
      this.isLoggedin = isLoggedIn;
      console.log('isLoggedinisLoggedin', this.isLoggedin);
    });
  }

  logout() {
    this.auth.logout();
  }
}
