import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router : Router){}

  email = "" ;
  password = "";
  loginMessage: string = ""; // Message for login success or failure
  messageClass: string = ""; // CSS class for styling messages

  
  onSubmit() {
    // Get users array from localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if any user matches the credentials
    let validUser = users.find((user: any) => user.email === this.email && user.password === this.password);

    if (validUser) {
      localStorage.setItem("loggedInUser", this.email);   // ✅ Save logged-in user's email

      this.loginMessage = "Login successful! Redirecting...";
      this.messageClass = "text-success";
      setTimeout(() => {
        this.router.navigate(['/projects']);
      }, 1500);
    } else {
      this.loginMessage = "Invalid email or password!";
      this.messageClass = "text-danger";
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  
}
                               
