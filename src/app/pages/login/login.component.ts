import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isDark = false;

  constructor(private fb: FormBuilder, private toastCtrl: ToastController) {}

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Please enter valid login credentials',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    console.log('Login data:', this.loginForm.value);

    const toast = await this.toastCtrl.create({
      message: 'Logged in successfully!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const body = document.body;
    this.isDark ? body.classList.add('dark') : body.classList.remove('dark');
  }
}
