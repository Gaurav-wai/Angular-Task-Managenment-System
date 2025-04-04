import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;


@Component({
  selector: 'app-projects',
  imports: [NgClass,NgFor, NgIf, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  constructor(private router : Router){}

  projects: any[] = []; // Keep this to store project data

  selectedProject: any = {
    id: '',
    userid: '',
    projectname: '',
    projectdescription: ''
  };
 

  ngOnInit() {
    const storedProjects = localStorage.getItem('projects');
    const loggedInUser = localStorage.getItem('loggedInUser');
  
    if (storedProjects && loggedInUser) {
      const allProjects = JSON.parse(storedProjects);
  
      // 🔹 Filter only projects created by the logged-in user
      this.projects = allProjects.filter((project: any) => project.createdBy === loggedInUser);
    } else {
      this.projects = []; // No projects to show
    }

 
  }
  
  // ngOnInit() {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //   const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');

  //   this.projects = allProjects.filter((proj: any) => proj.userid === currentUser.id);
  // }

  openEditModal(project: any): void {
    this.selectedProject = { ...project }; // Clone to avoid binding weirdness
  }
  

  updateProject(): void {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const index = allProjects.findIndex((p: any) => p.id === this.selectedProject.id);
  
    if (index !== -1) {
      allProjects[index] = { ...this.selectedProject }; // Update the object
      localStorage.setItem('projects', JSON.stringify(allProjects));
  
      // Re-load the user's projects
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.projects = allProjects.filter((p: any) => p.userid === currentUser.id);
    }
  
    // Close modal manually (Bootstrap 5 way)
    const modalElement = document.getElementById('editProjectModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.hide();
    }
  }
  


  editProject(project: any) {
    // Store the selected project in localStorage for editing
    localStorage.setItem('editProject', JSON.stringify(project));
    this.router.navigate(['/editProject']); // We'll create this component next
  }
  
  // deleteProject(title: string) {
  //   const storedProjects = localStorage.getItem('projects');
  //   if (storedProjects) {
  //     let allProjects = JSON.parse(storedProjects);
  
  //     // 🔥 Filter out the project by title
  //     allProjects = allProjects.filter((proj: any) => proj.title !== title);
  
  //     // 🔁 Update localStorage
  //     localStorage.setItem('projects', JSON.stringify(allProjects));
  
  //     // 🔃 Refresh list of projects for logged-in user
  //     const loggedInUser = localStorage.getItem('loggedInUser');
  //     this.projects = allProjects.filter((proj: any) => proj.createdBy === loggedInUser);
  //   }
  // }

  deleteProject(title: string): void {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
  
    // 🔸 Remove only the project with this title AND created by the logged-in user
    const loggedInUser = localStorage.getItem('loggedInUser');
  
    // Filter out the project you want to delete
    const updatedProjects = allProjects.filter((proj: any) => {
      return !(proj.title === title && proj.createdBy === loggedInUser);
    });
  
    // Save the updated project list
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
    // Refresh the list shown on screen: only current user's projects
    this.projects = updatedProjects.filter((proj: any) => proj.createdBy === loggedInUser);
  }
  
  
  
  redirectToAddProject() {
    this.router.navigate(['/addProject']); // Navigate to add project page
  }

  
  redirectToTask(project: any) {
    this.router.navigate(['/displayTasks'], { queryParams: { projectTitle: project.title } });
  }
  

}
