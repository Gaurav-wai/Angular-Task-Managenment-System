import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loginMessage: string = '';
  messageClass: string = '';

  constructor(private router: Router) {}

  onSignup() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.loginMessage = "All fields are required!";
      this.messageClass = 'text-danger';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.loginMessage = "Passwords do not match!";
      this.messageClass = 'text-danger';
      return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user already exists
    let existingUser = users.find((user: any) => user.email === this.email);
    if (existingUser) {
      this.loginMessage = "Email already registered! Please login.";
      this.messageClass = 'text-danger';
      return;
    }

    // Add new user
    users.push({ email: this.email, password: this.password });

    // Save updated users array to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    this.loginMessage = "Signup successful! Redirecting to login...";
    this.messageClass = 'text-success';

    // Redirect to login page
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);

  
  }                                                                        

                                                                                      
}                                     