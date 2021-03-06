import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import {  observable, Observable, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

url: string ="http://localhost:9090/api/projects";
urlPrefix: string = "http://localhost:9090";


 //for using services for communication
  //hideDetails: boolean = false;
/*
Communiation using observable

  //create a variable called observable to represent  the Observable for communication
  //public myObservable: Observable<boolean>;
  //myObservers to represent all subscribers 
  public myObservers: Observer<boolean>[] = [];
  constructor(private httpClient:HttpClient) {
      //whenever new subscriber is added RxJs automaticly pass its reference as a parameter called 'observer'
    this.myObservable = Observable.create((observer : Observer<boolean>)=>
    {
      //add obsever to the array
      this.myObservers.push(observer);

    });
    }
    hideDetails: boolean = false; 
    toggleDetails(){
      //parent -> projectsComponent
      //child -> project
      //goal: togglemethod should be invoke in parent component
      this.hideDetails = !this.hideDetails;
      //notify the changes to the child component
      //pass a notification to all observables by calling 'next'
      for (let index = 0; index < this.myObservers.length; index++) {
        this.myObservers[index].next(this.hideDetails);
        
      }
    }

*/
//Communiation using subject
public mySubject: Subject<boolean>;


//httpClient is just a refrence variable, used to access the object of httpClient service
//and private word make the property of current working service class
  constructor(private httpClient:HttpClient) {

    this.mySubject = new Subject<boolean>();
    }
    

 // by using obs u mean that u are ready to return an array of projects that is recived from server as response
  gtAllProjects():Observable<Project[]>{

     /* One method, send indivually the token
        * for all, subsequent request, where the authentication is required, You require 
        * to submitt the same token as a part of request header
        *  for ex, while making request to "api/projects" in the "project" service,
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
         //this header will be send to the server. And on the server side, the Authorize a      ttribute will
         //recive and verify the same
       }
       return this.httpClient.get<Project[]>(this.url,{headers: headers, responseType:"json"})
*/
//other method include using HTTPInterceptors
    return this.httpClient.get<Project[]>(this.urlPrefix + "/api/projects",{responseType:"json"})
    .pipe(map(
      (data: Project[])=>
      {
        //for(let i=0;i<data.length;i++)
        {
            //data[i].teamSize= data[i].teamSize*100;
        }
        console.log("IN service");
        console.log(data);
        return data;
      }
    )); // this method returns an observable of project array type

  }
  insertProject(newProject: Project): Observable<Project>
  {
    var requestHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.set("X-XSRF-TOKEN", sessionStorage['XSRFRequestToken']);
    return this.httpClient.post<Project>(this.urlPrefix + "/api/projects", newProject, { headers: requestHeaders, responseType: "json" });
  }
  
  //Observable<Project> ->promise that we are going to return a project object after completion of ajax request
  
  //{responseType:"json"} indicates angular converts the response automatically into respective object 
    //after receing resonse from server
  updateProject(exsistingProject:Project):Observable<Project>
  {
    
    return this.httpClient.put<Project>(this.urlPrefix + "/api/projects",exsistingProject,{responseType:"json"});
  }
  searchProject(searchBy: string, searchText: string):Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.urlPrefix + "/api/projects/search/" + searchBy + "/" + searchText,{responseType:"json"});
  }

  //returns an observable of string
  deleteProject(projectId: number):Observable<string>{
    return this.httpClient.delete<string>(this.urlPrefix + "/api/projects?ProjectID=" + projectId);
  }
  getProjectByID(ProjectID: number):Observable<Project>
  {
    return this.httpClient.get<Project>(this.urlPrefix + "/api/projects/searchbyprojectid/" + ProjectID, {responseType:"json"});
  
  }

  hideDetails: boolean = false; 
    toggleDetails(){
      //parent -> projectsComponent
      //child -> project
      //goal: togglemethod should be invoke in parent component
      this.hideDetails = !this.hideDetails;
      //subject do all that observable thimg internally, so no need for next
        this.mySubject.next(this.hideDetails);

    }

 
}
