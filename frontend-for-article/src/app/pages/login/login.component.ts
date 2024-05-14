import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    // private toast: NgToastService,
    private auth: AuthService,
    private router: Router
  ) {}

  loginForm;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    // console.log("login values", this.loginForm.value)
    this.auth.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        console.log("res.user_id", res)
        if (res && res.user) {
          this.auth.setUserIdInLocalStorage(res.user);
          this.router.navigate(['home']);
        }
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
