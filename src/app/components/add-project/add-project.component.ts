import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-project',
  imports: [FormsModule, NgIf, NavbarComponent],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {

  teamMembers = ['Alice', 'Bob', 'Charlie'];

  newProject = {
    title: '',
    description: '',
    createdBy: '',
    projectManager: '',
    startDate: '',
    endDate: '',
    teamMembers: '' ,
    dueDays: null as number | null,
    taskCount: 0,
    status:'',
    creationDate: ''
  }; 




  // teamMembers: [] = ['Alice', 'Bob', 'Charlie'];

  // now: Date = new Date();

  now: string;

  constructor(private router: Router) {

    this.now = new Date().toISOString().substring(0, 10);
                                                                            
    // Set the default value for creationDate using now
    this.newProject.creationDate = this.now;
  }

  calculateDueDays() {
    const start = new Date(this.newProject.startDate);
    const end = new Date(this.newProject.endDate);
  
    if (this.newProject.startDate && this.newProject.endDate) {
      const diffInTime = end.getTime() - start.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // Converts ms to days
  
      this.newProject.dueDays = diffInDays >= 0 ? diffInDays : 0; // Avoid negative due days
    } else {
      this.newProject.dueDays = null; // Or set to 0 if you want
    }
  }
  
                                                            
  saveProject() {

      // 🔹 Get logged-in user email from localStorage
  const loggedInUser = localStorage.getItem('loggedInUser');

  // 🔹 Assign it to the newProject's createdBy field
  this.newProject.createdBy = loggedInUser || '';

    // Get existing projects from local storage or initialize an empty array
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Add new project to the list
    projects.push(this.newProject);

    // Save updated project list back to LocalStorage
    localStorage.setItem('projects', JSON.stringify(projects));

    console.log(this.newProject);

    // Redirect to project listing page after saving
    this.router.navigate(['/projects']);
  }

}
