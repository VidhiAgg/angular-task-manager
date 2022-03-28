import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

url: string ="http://localhost:9090/api/projects";

//httpcClient is just a refrence variable, used to access the object of httpClient service
//and private word make the property of current working service class0
  constructor(private httpClient:HttpClient) { }

 // by using obs u mean that u are ready to rtuen an array of projects tht is recived from server as response
  gtAllProjects():Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.url,{responseType:"json"})
    .pipe(map(
      (data: Project[])=>
      {
        for(let i=0;i<data.length;i++)
        {
            data[i].teamSize= data[i].teamSize*100;
        }
        return data;
      }
    )); // thi method returns an observable of project array type

  }
  insertProject(newProject:Project):Observable<Project>{
    return this.httpClient.post<Project>(this.url,newProject,{responseType:"json"});
  }
  //Observable<Project> ->promise that we are going to return a project object after completion of ajax request
  updateProject(exsistingProject:Project):Observable<Project>{
    //{responseType:"json"} indicates angular converts the response automatically into respective object 
    //after receing resonse from server
    return this.httpClient.put<Project>(this.url,exsistingProject,{responseType:"json"});
  }
  searchProject(searchBy: string, searchText: string):Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.url+"/search/"+searchBy+"/"+searchText,{responseType:"json"});
  }

  //returns an observable of string
  deleteProject(projectId: number):Observable<string>{
    return this.httpClient.delete<string>(this.url+"?ProjectID="+projectId);
  }
}
