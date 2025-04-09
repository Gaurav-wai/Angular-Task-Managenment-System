import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { DisplayTasksComponent } from './components/display-tasks/display-tasks.component';

export const routes: Routes = [

{path: 'login', component: LoginComponent},
{path:'projects', component: ProjectsComponent},    
{path:"signup", component:SignupComponent},
{path: "addProject", component:AddProjectComponent},
{path: "addTask", component:AddTaskComponent},
{path: "displayTasks", component:DisplayTasksComponent},

{ path: '', redirectTo: '/login', pathMatch: 'full' }, // ✅ Only one default redirect
];                                                                                                                                                                                                                                                                                                                      