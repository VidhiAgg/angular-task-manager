import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tasks } from 'src/app/models/tasks';
import { TaskStatus } from 'src/app/models/task-status';
import { TaskStatusDetail } from 'src/app/models/task-status-detail';
import { TaskStatusService } from 'src/app/services/task-status.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  //properties to represent taskStatusDetail
  taskID : number;
  currentTask : Tasks = new Tasks();
  currentTaskStatusDetail : TaskStatusDetail = new TaskStatusDetail();
  editTaskStatusForm : FormGroup | any = null;
  taskStatuses : Observable<TaskStatus[]>;
  constructor(private taskServices : TaskService, 
    private router : Router, 
    private taskStatusService: TaskStatusService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    //receving taskId that is passed in route
    this.activatedRoute.params.subscribe((param) => {
      this.taskID = param["taskid"];
    });
      //create Reactive form
      this.editTaskStatusForm = new FormGroup({
        thisStatusDetailID : new FormControl(0),
        taskID : new FormControl(null),
        taskStatusID : new FormControl(null),
        description : new FormControl(null)

      });
      //get taskStatuses from db for dropdownlist
      this.taskStatuses = this.taskStatusService.getTaskStatuses();
      //get taskDeatails by taskId
      this.taskServices.getTaskByTaskID(this.taskID).subscribe((task: Tasks) =>{
        this.currentTask = task;

        //load the details into reactive form
        this.currentTaskStatusDetail.taskID  = this.taskID;
        this.currentTaskStatusDetail.description = null;
        this.currentTaskStatusDetail.taskStatusID  = task.currentStatusID;
        this.currentTaskStatusDetail.taskStatusDetailID = 0;
        this.editTaskStatusForm.patchValue(this.currentTaskStatusDetail);

      });
  }
  onUpdateTasKStatusClick(event){
    this.editTaskStatusForm["submitted"] = true;
    if (this.editTaskStatusForm.valid) {
      this.taskServices.updateTaskStatus(this.editTaskStatusForm.value).subscribe((response)=>{
          this.router.navigate(["/employee", "task"]);
      },(error)=>{
        console.log(error);
        
      });
    }else{
      console.log(this.editTaskStatusForm.errors);
      
    }
  }

}
