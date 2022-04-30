import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

url: string ="http://localhost:9090/api/projects";

//httpClient is just a refrence variable, used to access the object of httpClient service
//and private word make the property of current working service class
  constructor(private httpClient:HttpClient) {
      
    }

 // by using obs u mean that u are ready to return an array of projects tht is recived from server as response
  gtAllProjects():Observable<Project[]>{

     /* One method, send indivually the token
        * for all, subsequent request, where the authenticatio is required, You require 
        * to submitt the same token as a part of request header
        *  for ex, while making equest ti "api/projects" in he "project" service,
        * we require to add the JWT toke into a request header 
        * called "authorization" with a prefix called "Bearer"
        */
       /*var currentUser = {token: ""}; //created an obj with empty token
       var headers = new HttpHeaders();
       headers = headers.set("Authorization","Bearer ");
       if(sessionStorage != null){
         // going to convert it into object
         currentUser = JSON.parse(sessionStorage['currentUser']);
         headers = headers.set("Authorization" ,"Bearer "+ currentUser.token); 
         //this header will be send to the server. And on the server side, the Authorize attribute will
         //recive and verify the same
       }
       return this.httpClient.get<Project[]>(this.url,{headers: headers, responseType:"json"})
*/
//other method include using HTTPInterceptors
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
    )); // this method returns an observable of project array type

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
