import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStatus } from '../models/task-status';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {
  urlPrefix: string = "http://localhost:9090";
  constructor(private httpClient : HttpClient) { }

  getTaskStatuses():Observable<TaskStatus[]>{
    return this.httpClient.get<TaskStatus[]>(this.urlPrefix+"/api/taskstatuses",{responseType:"json"});
  }
getTaskStatusesByID(taskStatusId: number):Observable<TaskStatus>{
  return this.httpClient.get<TaskStatus>(this.urlPrefix+"/api/taskstatuses/searchbytaskStatusid/"+taskStatusId,{
    responseType:"json"
  });
}

insertTaskStatus(newTaskStatus: TaskStatus):Observable<TaskStatus>{
  return this.httpClient.post<TaskStatus>(this.urlPrefix + "/api/taskstatuses",newTaskStatus,{responseType: "json"});
}
updateTaskStatus(exsitingTaskStatus: TaskStatus):Observable<TaskStatus>{
  return this.httpClient.post<TaskStatus>(this.urlPrefix + "/api/taskstatuses",exsitingTaskStatus,{responseType: "json"});

}
deleteTaskStatus(taskStatusID: number):Observable<string>{
  return this.httpClient.delete<string>(this.urlPrefix + "/api/taskstatuses?TaskStatusID=" +taskStatusID);

}

}
