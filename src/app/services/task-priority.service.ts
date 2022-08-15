import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskPriority } from '../models/task-priority';

@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {
  urlPrefix: string = "http://localhost:9090";
  constructor(private httpClient : HttpClient) { }
  
  getTaskPriorities():Observable<TaskPriority[]>{
    return this.httpClient.get<TaskPriority[]>(this.urlPrefix+"/api/taskpriorities",{responseType:"json"});
  }
getTaskPrioritiesByID(taskPriorityId: number):Observable<TaskPriority>{
  return this.httpClient.get<TaskPriority>(this.urlPrefix+"/api/taskpriorities/searchbytaskpriorityid/"+taskPriorityId,{
    responseType:"json"
  });
}

insertTaskPriority(newTaskPriority: TaskPriority):Observable<TaskPriority>{
  return this.httpClient.post<TaskPriority>(this.urlPrefix + "/api/taskpriorities",{responseType: "json"});
}
updateTaskPriority(exsitingTaskPriority: TaskPriority):Observable<TaskPriority>{
  return this.httpClient.post<TaskPriority>(this.urlPrefix + "/api/taskpriorities",exsitingTaskPriority,{responseType: "json"});

}
deleteTaskPriority(taskPriorityID: number):Observable<string>{
  return this.httpClient.delete<string>(this.urlPrefix + "/api/taskpriorities?TaskPriorityID=" +taskPriorityID);

}

}