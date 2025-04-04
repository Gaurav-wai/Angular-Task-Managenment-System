import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  imports: [FormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {

  newProject = {
    title: '',
    description: '',
    createdBy: '',
    projectManager: '',
    startDate: '',
    endDate: '',
    teamMembers: '',
    dueDays: ''
  }; 

  constructor(private router: Router) {}

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
                                                                                                   