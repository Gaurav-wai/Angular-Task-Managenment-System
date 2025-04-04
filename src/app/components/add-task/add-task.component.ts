import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task = {
    title: '',
    assignedTo: '',
    status: 'Medium',
    assignedUser: '',
    estimate: '',
    timeSpent: '',
    projectTitle: '' // Store the project title here
  };


  tasks: any[] = []; // To store all tasks
 
  

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.task.projectTitle = params['projectTitle']; // Get project title
    });

    // Load existing tasks
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  onSubmit() {
    this.tasks.push(this.task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Save to local storage
    console.log('Task Added:', this.task);
    alert("Task added successfully!!")

    // Redirect back to display tasks with projectTitle
   this.router.navigate(['/displayTasks'], { queryParams: { projectTitle: this.task.projectTitle } });
  }

  

  // onSubmit() {
  //   console.log('Task Added:', this.task);
  //   // You can now send this data to a backend or store it in localStorage
  // }

  onClose(){
    this.router.navigate(['/displayTasks']);
  }

}