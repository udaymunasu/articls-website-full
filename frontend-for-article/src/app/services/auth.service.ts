import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const apiUrls = {
  authServiceApi: 'http://localHost:8081/api/auth/'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  isLoggedin: boolean = !!localStorage.getItem('user_id'); // Initialize based on localStorage

  loginStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  registerService(regObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, regObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj).pipe(
      tap((response) => {
        localStorage.setItem('user_id', response.user._id);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.isLoggedin = true; // Update the isLoggedIn property
        this.loginStateChanged.emit(true); // Notify components
        this.router.navigate(['home']);
      })
    );
  }

  setUserIdInLocalStorage(user: any) {
    localStorage.setItem('user id', JSON.stringify(user));
  }

  getUserFromLocalStorage(): any {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      return null; // Or handle this case as needed
    }
  }

  logout() {
    // Your logout logic here
    this.isLoggedin = false; // Update the isLoggedIn property
    this.loginStateChanged.emit(false); // Notify components
    localStorage.removeItem('user');

    localStorage.removeItem('user'); // Remove the user ID from localStorage
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('user_id');
  }
}
