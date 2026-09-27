import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from "@angular/core";
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
  standalone: true,
})



export class LoginComponent {
  private fb = inject(FormBuilder)
  showPassword = false;


  loginForm : FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ckeckErrors(form: FormGroup){
    console.log(form.valid);
  }

  onSubmit(): void {
    if(this.loginForm.valid){
      console.log('Form Data: ', this.loginForm.value);
    } else {
      console.log('Wrong form');
    }
  }


}
