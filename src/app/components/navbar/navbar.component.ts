import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // ✅ Fixed
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private darkModeService: DarkModeService) {}

  isDarkMode = false; // ✅ For icon and mode tracking
  userName: string = '';

  ngOnInit() {
    this.isDarkMode = this.darkModeService.getCurrentMode();
    this.darkModeService.updateBodyClass(this.isDarkMode); // ✅ Apply body class on load

    // ✅ Keep darkMode status in sync
    this.darkModeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });


    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      // If you're only storing email
      this.userName = loggedInUser;
    }
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goToProjects(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/projects']);
  }

  goToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/addProject']);
  }
}
