import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedTask } from '../models/grouped-task';
import { TaskStatusDetail } from '../models/task-status-detail';
import { Tasks } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient : HttpClient) { }


  getTask () : Observable<GroupedTask[]>{
    return this.httpClient.get<GroupedTask[]>("/api/task", {responseType:"json"});
  }

  getTaskByTaskID (TaskID: number) : Observable<Tasks>{
    return this.httpClient.get<Tasks>("/api/task/searchbytaskid/"+ TaskID, {responseType:"json"});
  }

  insertTask (newTask : Tasks) : Observable<Tasks>{
    return this.httpClient.post<Tasks>("/api/createtask",newTask, {responseType:"json"});
  }
  updateTaskStatus (taskStatusDetail: TaskStatusDetail) : Observable<TaskStatusDetail>{
    return this.httpClient.put<TaskStatusDetail>("/api/updatetaskstatus", taskStatusDetail, {responseType:"json"});
  }
}
