import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { SignUpViewModal } from '../models/sign-up-view-modal';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:any="http://localhost:9090";

  private httpClient : HttpClient;
//HttpBackend -> represnts http Client w/o interceptors
  constructor(private httpBackend: HttpBackend,
    private router : Router,
    private jwtHelerService: JwtHelperService) { 

    
  }
  currentUserName: any=null;
  // property to store te current user role, will be accessible to all the components by using the LoginService
  currentUserRole : any = null;
  public login(loginView: LoginViewModel):Observable<any>{
    //represents the actual HttpClient w/o any interceptor i.e. 
    //the authorization req is not added for this req
    //observe: Defines whether we want complete response or body only or events only.
    //responseType: Defines response type such as arraybuffer, blob, json and text.
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.url+"/authenticate",loginView,{responseType:"json", observe: "response"})
    .pipe(map(response =>{
      if(response)
      {
        this.currentUserName=response.body.userName;

        this.currentUserRole = response.body.role;
        //ss so that it will not be accessible by oter tabs and browser
        //storing complete user object in the session storage
        //so it became availabel gor other services

        /*
        * for all, subsequent request, where the authenticatio is required, You require 
        * to submitt the same token as a part of request header
        *  for ex, while making Request tO "api/projects" in The "project" service,
        * we require to add the JWT toke into a request header 
        * called "authorization" with a prefix called "Bearer"
        */
        //ss so that it will not be accessible by oter tabs and browser
        //storing complete user object in the session storage
        //so it became availabel For other services
        
        sessionStorage['currentUser'] = JSON.stringify(response.body);
        sessionStorage['XSRFRequestToken'] = response.headers.get("XSRF-REQUEST-TOKEN")
      }
      return response.body;
    }));
  }
    /**
     * logout
     */
    public logout():void {
      sessionStorage.removeItem("currentUser");
      this.router.navigate(['']);
    }
    public isAuthenticated(): boolean{
     
      //false token is invalid , true //token is valid
      if (this.jwtHelerService.isTokenExpired() ) {
        return false;
      } else {
        return true;
      }
    }

    /**
     * register that will recives the signUpModel as parameter
     */
     public register(signUpViewModel: SignUpViewModal): Observable<any> {
      this.httpClient = new HttpClient(this.httpBackend);
      return this.httpClient.post<any>(this.url + "/register", signUpViewModel, { responseType: "json", observe: "response" })
        .pipe(map(response => {
          if (response) {
            this.currentUserName = response.body.userName;
            sessionStorage['currentUser'] = JSON.stringify(response.body);
            sessionStorage['XSRFRequestToken'] = response.headers.get("XSRF-REQUEST-TOKEN");
          }
          return response.body;
        }));
    }
  
    getUserByEmail(email: string) :Observable<any>
    {
      this.httpClient = new HttpClient(this.httpBackend);
      return this.httpClient.get<any>(this.url+"/api/getUserByEmail/" + email,{responseType:"json"});
      
    }
    detectIfAlreadyLoggedIn()
    {
      if (this.jwtHelerService.isTokenExpired() == false) {
        var currentUser = JSON.parse(sessionStorage['currentUser']);
        this.currentUserName = currentUser.userName;
        this.currentUserRole = currentUser.role;
      } 
    }

    getAllEmployees() :Observable<any>
    {
      this.httpClient = new HttpClient(this.httpBackend);
      return this.httpClient.get<any>(this.url+"/api/getallemployees/", {responseType:"json"});
      
    }

}