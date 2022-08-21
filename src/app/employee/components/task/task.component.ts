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

  constructor(private loginService : LoginService,
    private taskService : TaskService) { }


  ngOnInit(): void {
    this.taskService.getTask().subscribe((response) =>{
      this.taskGroups = response;
    });
  }
}