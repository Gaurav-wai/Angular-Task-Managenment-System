import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
declare var bootstrap: any;


@Component({
  selector: 'app-display-tasks',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule,CommonModule, NavbarComponent],
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css']
})
export class DisplayTasksComponent {
  tasks: any[] = []; // Array to store filtered tasks
  projectTitle: string = ''; // Store the project title

  selectedTask: any = null; // ✅ Add this line to fix the error

  selectedTaskIndex: number = -1;
  
  searchText: string = '';
selectedStatus: string = '';

isDarkMode: boolean = false;


  constructor(private route: ActivatedRoute, public router:Router) {}

  ngOnInit() {
    // Get projectTitle from query params
    this.route.queryParams.subscribe(params => {
      this.projectTitle = params['projectTitle'];

      console.log("Project Title from URL:", this.projectTitle); // Check if it's coming

      // Load all tasks from localStorage
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const allTasks = JSON.parse(storedTasks);

        console.log("All tasks from storage:", allTasks); // Check saved tasks

        // Filter tasks based on project title
        // this.tasks = allTasks.filter(task => task.projectTitle === this.projectTitle);
        this.tasks = allTasks.filter((task: { projectTitle: string }) => task.projectTitle === this.projectTitle);

        console.log("Filtered tasks:", this.tasks); // Check if filtering works

        const theme = localStorage.getItem('theme');
   this.isDarkMode = theme === 'dark';
   

      }
    });
}


editTask(task: any, index: number) {
  this.selectedTask = { ...task };
  this.selectedTaskIndex = index;

  const modalElement = document.getElementById('editTaskModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}



deleteTask(taskToDelete: any) {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    let allTasks = JSON.parse(storedTasks);
    // Remove the task
    allTasks = allTasks.filter((task: any) => {
      return !(
        task.projectTitle === taskToDelete.projectTitle &&
        task.title === taskToDelete.title &&
        task.assignedTo === taskToDelete.assignedTo
      );
    });
    // Update localStorage and tasks list
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    this.tasks = allTasks.filter((task: any) => task.projectTitle === this.projectTitle);
  }
}


updateTask() {
  if (this.selectedTask) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      let allTasks = JSON.parse(storedTasks);

      // Use title + projectTitle to uniquely find the task
      const index = allTasks.findIndex((task: any) =>
        task.title === this.selectedTask.title &&
        task.projectTitle === this.selectedTask.projectTitle
      );

      if (index !== -1) {
        // Only update fields, not title
        allTasks[index] = {
          ...allTasks[index],
          assignedTo: this.selectedTask.assignedTo,
          status: this.selectedTask.status,
          estimate: this.selectedTask.estimate,
          timeSpent: this.selectedTask.timeSpent
        };

        localStorage.setItem('tasks', JSON.stringify(allTasks));
        this.tasks = allTasks.filter((task: any) => task.projectTitle === this.projectTitle);
        this.selectedTask = null;

        // Close the modal using Bootstrap JS (optional)
        const modalElement = document.getElementById('editTaskModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    }
  }
}


get filteredTasks() {
  return this.tasks.filter(task => {
    const searchMatch = this.searchText.trim() === '' || task.title.toLowerCase().includes(this.searchText.toLowerCase());
    const statusMatch = this.selectedStatus === '' || task.status.toLowerCase() === this.selectedStatus.toLowerCase();
    return searchMatch && statusMatch;
  });
}


getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'high': return 'bg-primary';
    case 'medium': return 'bg-warning text-dark';
    case 'completed': return 'bg-success';
    case 'on hold': return 'bg-danger';
    default: return 'bg-secondary';
  }
}

navigateAddTask(){
  this.router.navigate(["/addTask"]);
}

 // Navigate to add task page
 navigateToAddTask() {
  this.router.navigate(['/addTask'], { queryParams: { projectTitle: this.projectTitle } });
}
}