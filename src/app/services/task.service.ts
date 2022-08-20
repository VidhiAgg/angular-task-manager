import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient : HttpClient) { }

  insertTask (newTask : Task) : Observable<Task>{
    return this.httpClient.post<Task>("/api/createtask",newTask, {responseType:"json"});
  }
}
