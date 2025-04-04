import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSignup() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user already exists
    let existingUser = users.find((user: any) => user.email === this.email);
    if (existingUser) {
      alert("Email already registered! Please login.");
      return;
    }

    // Add new user
    users.push({ email: this.email, password: this.password });

    // Save updated users array to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Redirecting to login...");

    // Redirect to login page
    this.router.navigate(['/login']);

  
  } 

                                                                                      
}                                                                         

                                      

                                                                 