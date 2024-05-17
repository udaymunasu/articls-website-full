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
  showPassword: boolean = true;

  loginForm;

  isSignUpActive: boolean = true;

  toggleRightPanel() {
    this.isSignUpActive = !this.isSignUpActive;
  }

  ngOnInit(): void {
    const container = document.getElementById('container');
    const overlayCon = document.getElementById('overlay Con');
    const overlayBtn = document.getElementById('overlayBtn'); 
    if(overlayBtn && container)  {
      overlayBtn.addEventListener('click', () => {
        container.classList.toggle('right-panel-active');
      });
    }
   
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.togglePasswordVisibility()
  }

  login() {
    // console.log("login values", this.loginForm.value)
    this.auth.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('res.user_id', res);
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

  onFileSelected(e) {

  }
}
