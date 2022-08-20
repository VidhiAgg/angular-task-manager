import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { TaskPriority } from 'src/app/models/task-priority';
import { LoginService } from 'src/app/services/login.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TaskPriorityService } from 'src/app/services/task-priority.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  //for adding records
  newTaskForm :FormGroup | any = null;
  //to store array of projects
  projects : Observable<Project[]>;
  //to store list of employees
  employees : Observable<any>;
  //to store task Priority
  taskPriorities : Observable<TaskPriority[]>;

  constructor(private tasksServices: TaskService, private router : Router, private projectService : ProjectsService,
    private taskPrioritiesService: TaskPriorityService, private loginServices : LoginService) { }

  ngOnInit(): void{
    this.newTaskForm = new FormGroup({
    taskID : new FormControl(0),
    taskName : new FormControl(null,[Validators.required]),
    description : new FormControl(null,[]),
    projectID : new FormControl(0,[Validators.required]),
    assignedTo : new FormControl(null,[Validators.required]),
    taskPriorityID : new FormControl(2,[Validators.required]),

   });
   this.projects = this.projectService.gtAllProjects();
   this.employees = this.loginServices.getAllEmployees();
   this.taskPriorities = this.taskPrioritiesService.getTaskPriorities();
  }

  onCreateTaskClick(event){
    this.newTaskForm["submitted"]  = true;
    if(this.newTaskForm.valid)
        {
          this.tasksServices.insertTask(this.newTaskForm.value).subscribe((response)=>{
              this.router.navigate(["/employee","task"]);
          },(error)=>{
            console.log(error);
            
          });
        }
        else{
          console.log(this.newTaskForm.errors);
        }
  }

}


