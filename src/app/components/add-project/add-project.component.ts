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

  newProject = {
    title: '',
    description: '',
    createdBy: '',
    projectManager: '',
    startDate: '',
    endDate: '',
    teamMembers:[],
    dueDays: '',
    taskCount: 0,
    status:'',
    creationDate: ''
  }; 


  teamMembers: string[] = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Frank',
    'Grace',
    'Hannah',
    'Ian',
    'Julia'
  ];

  // now: Date = new Date();

  now: string;

  constructor(private router: Router) {

    this.now = new Date().toISOString().substring(0, 10);

    // Set the default value for creationDate using now
    this.newProject.creationDate = this.now;
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
                                                                                                                                                                                  