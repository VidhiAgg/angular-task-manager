import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedTask } from '../models/grouped-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient : HttpClient) { }


  getTask () : Observable<GroupedTask[]>{
    return this.httpClient.get<GroupedTask[]>("/api/task", {responseType:"json"});
  }
  insertTask (newTask : Task) : Observable<Task>{
    return this.httpClient.post<Task>("/api/createtask",newTask, {responseType:"json"});
  }
}
