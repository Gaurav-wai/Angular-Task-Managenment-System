// ✅ CREATE THIS FILE: dark-mode.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialMode());
  darkMode$ = this.darkModeSubject.asObservable();

  private getInitialMode(): boolean {
    return localStorage.getItem('darkMode') === 'true';
  }

  toggleDarkMode() {
    const newMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newMode);
    localStorage.setItem('darkMode', String(newMode));
    this.updateBodyClass(newMode);
  }

  updateBodyClass(isDark: boolean) {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }

  getCurrentMode(): boolean {
    return this.darkModeSubject.value;
  }
}
