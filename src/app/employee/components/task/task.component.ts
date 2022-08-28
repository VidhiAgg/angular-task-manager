import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { GroupedTask } from "src/app/models/grouped-task";
import { Project } from "src/app/models/project";
import { TaskPriority } from "src/app/models/task-priority";
import { LoginService } from "src/app/services/login.service";
import { ProjectsService } from "src/app/services/projects.service";
import { TaskPriorityService } from "src/app/services/task-priority.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  //contains an array of group task
  taskGroups : GroupedTask[];

  constructor(public loginService : LoginService,
    private taskService : TaskService, ) { }


  ngOnInit(): void {
    this.taskService.getTask().subscribe((response) =>{
      this.taskGroups = response;
    });
  }
  /* get bg color based on task Status
  */
 getTaskGroupBgCssClass(taskStatusName) : string{
  var className;
  switch(taskStatusName){
    case "Holding" : className = "bg-secondary text-white"; break;
    case "Prioritized" : className = "bg-primary text-white"; break;
    case "Started" : className = "bg-info text-white"; break;
    case "Finished" : className = "bg-success text-white"; break;
    case "Reverted" : className = "bg-danger text-white"; break;
  }
  return className;
 }

 /* get bg color based on task Priority
  */
 getTaskPriorityBgCssClass(taskStatusName) : string{
  var className;
  switch(taskStatusName){
    case "Urgent" : className = "badge-danger"; break;
    case "Normal" : className = "badge-primary "; break;
    case "Below-Normal" : className = "badge-info "; break;
    case "Low" : className = "badge-secondary "; break;
  }
  return className;
 }

   /* get bg color based on task StatusName
  */
   getTaskNameBgCssClass(taskStatusName) : string{
    var className;
    switch(taskStatusName){
      case "Holding" : className = " text-secondary"; break;
      case "Prioritized" : className = "text-primary"; break;
      case "Started" : className = "text-info"; break;
      case "Finished" : className = "text-success"; break;
      case "Reverted" : className = "text-danger"; break;
    }
    return className;
   }

}