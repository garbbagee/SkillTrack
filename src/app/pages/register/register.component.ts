import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private toastCtrl: ToastController) {}

  get username() {
    return this.registerForm.get('username')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  get passwordMismatch(): boolean {
    const pass = this.password.value;
    const confirm = this.confirmPassword.value;
    return !!(pass && confirm && pass !== confirm);
  }

  async onSubmit() {
    if (this.registerForm.invalid || this.passwordMismatch) {
      const toast = await this.toastCtrl.create({
        message: 'Please fill the form correctly',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    console.log('Form data:', this.registerForm.value);

    const toast = await this.toastCtrl.create({
      message: 'User registered successfully!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;

    if (this.isDarkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
