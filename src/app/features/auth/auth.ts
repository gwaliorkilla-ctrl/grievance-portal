import { Component,inject,OnInit,signal } from '@angular/core';
import {form, FormField,required,minLength} from '@angular/forms/signals';
import { AuthService } from '../../core/services/authService';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.type';
interface LoginData{
  username: string,
  password: string
}

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class Auth implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);
  loginModel= signal<LoginData>({
    username:'',
    password:''
  });
  loginForm = form(this.loginModel,(schema)=>{
    required(schema.username, {message: "Username is Required"});
    required(schema.password, {message: "Password is required"});
    minLength(schema.password, 8, {message: "Min length of password should be 8"});
  });

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      const credentials = this.loginModel();

      this.authService.handleLogin(credentials.username,credentials.password).subscribe({
        next: (response:User) => {
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  }
  ngOnInit(): void {
    
  }
}