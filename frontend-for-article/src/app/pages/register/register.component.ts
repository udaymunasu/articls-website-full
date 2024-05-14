import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPasswordValidator } from 'src/app/validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    // private toast: NgToastService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  register() {
    debugger
    if (this.registerForm) {
      console.log('Form values:', this.registerForm.value);
      this.auth.registerService(this.registerForm.value).subscribe({
        next: (res) => {
          alert('User created');
          console.log('Response from registration:', res.user);
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.error('Error during registration:', err);
        },
      });
    }
  }


}
