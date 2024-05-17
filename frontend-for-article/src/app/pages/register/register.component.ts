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
        image: [''],
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

  imageUrl

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to the scaled size
        const maxWidth = 600; // Adjust this according to your requirement
        const maxHeight = 400; // Adjust this according to your requirement
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert canvas to base64 string
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

        // Update form value
        this.registerForm.patchValue({
          image: compressedBase64,
        });

        console.log('Selected Image:', compressedBase64);
      };
    };

    reader.readAsDataURL(file);
  }
}
