import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
declare var bootstrap: any;


@Component({
  selector: 'app-projects',
  imports: [NgClass,NgFor, NgIf, FormsModule, NavbarComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  userName: string = '';

  constructor(private router : Router){}

  projects: any[] = []; // Keep this to store project data

  selectedProject: any = {
    id: '',
    title: '',
    description: '',
    createdBy: '' // same as loggedInUser (email)
  };
  
  
  searchText: string = '';
  selectedStatus: string = '';
  

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


        // ✅ Apply dark mode class based on saved setting
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
 
        
        if (loggedInUser) {
          // If you're only storing email
          this.userName = loggedInUser;
        }
        
  }
  


  openEditModal(project: any): void {
    this.selectedProject = { ...project };
  }
  
  

  

  updateProject(): void {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const loggedInUser = localStorage.getItem('loggedInUser');
  
    const index = allProjects.findIndex((p: any) => 
      p.id === this.selectedProject.id && p.createdBy === loggedInUser
    );
  
    if (index !== -1) {
      // Replace with updated data
      allProjects[index] = {
        ...this.selectedProject,
        createdBy: loggedInUser // Ensure consistency
      };
  
      localStorage.setItem('projects', JSON.stringify(allProjects));
  
      // Refresh current user's project list
      this.projects = allProjects.filter((p: any) => p.createdBy === loggedInUser);
    }
  
    // Close the modal
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
  



  filteredProjects() {
    return this.projects.filter(project => {
      const matchesName = project.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.selectedStatus ? project.status === this.selectedStatus : true;
      return matchesName && matchesStatus;
    });
  }
 
  
  clearFilters() {
    this.searchText = '';
    this.selectedStatus = '';
  }
  

  
  redirectToAddProject() {
    this.router.navigate(['/addProject']); // Navigate to add project page
  }

  
  redirectToTask(project: any) {
    this.router.navigate(['/displayTasks'], { queryParams: { projectTitle: project.title } });
  }
  

}
