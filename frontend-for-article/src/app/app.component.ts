import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-article';

  isLoggedin: boolean
  // this.auth.isLoggedIn();
  user: any;
  welcomeName;
  constructor(
    // private auth: AuthService, private router: Router
  ) {}

  ngOnInit(): void {
    // this.isLoggedin = this.auth.isLoggedin;
    // this.user = this.auth.getUserFromLocalStorage();
    // this.welcomeName = this.user.user.firstname;
    // // Subscribe to login state changes using the event emitter
    // this.auth.loginStateChanged.subscribe((isLoggedIn: boolean) => {
    //   this.isLoggedin = isLoggedIn;
    //   console.log('isLoggedinisLoggedin', this.isLoggedin);
    // });
  }

  logout() {
    // this.auth.logout();
  }
}
