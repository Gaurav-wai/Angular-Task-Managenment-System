import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-tasks',
  imports: [NgFor,NgIf],
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.css'
})
export class DisplayTasksComponent {
  tasks: any[] = []; // Array to store filtered tasks
  projectTitle: string = ''; // Store the project title

  constructor(private route: ActivatedRoute, public router:Router) {}

  ngOnInit() {
    // Get projectTitle from query params
    this.route.queryParams.subscribe(params => {
      this.projectTitle = params['projectTitle'];

      // Load all tasks from localStorage
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const allTasks = JSON.parse(storedTasks);

        // Filter tasks based on project title
        // this.tasks = allTasks.filter(task => task.projectTitle === this.projectTitle);
        this.tasks = allTasks.filter((task: { projectTitle: string }) => task.projectTitle === this.projectTitle);

      }
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