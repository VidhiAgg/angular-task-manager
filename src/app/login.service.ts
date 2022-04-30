import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:any="http://localhost:9090/authenticate";

  private httpClient : HttpClient;
//HttpBackend -> represnts http Client w/o interceptors
  constructor(private httpBackend: HttpBackend,
    private router : Router,
    private jwtHelerService: JwtHelperService) { 

    
  }
  currentUserName: any=null;
  public login(loginView: LoginViewModel):Observable<any>{
    //represents the actual HttpClient w/o any interceptor i.e. 
    //the authorization req is not added for this req
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(this.url,loginView,{responseType:"json"})
    .pipe(map(user =>{
      if(user)
      {
        this.currentUserName=user.userName;
        //ss so that it will not be accessible by oter tabs and browser
        //storing complete user object in the session storage
        //so it became availabel gor other services

        /*
        * for all, subsequent request, where the authenticatio is required, You require 
        * to submitt the same token as a part of request header
        *  for ex, while making equest ti "api/projects" in he "project" service,
        * we require to add the JWT toke into a request header 
        * called "authorization" with a prefix called "Bearer"
        */
        //ss so that it will not be accessible by oter tabs and browser
        //storing complete user object in the session storage
        //so it became availabel gor other services
        
        sessionStorage['currentUser'] = JSON.stringify(user);
      }
      return user;
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
      var token = sessionStorage.getItem("currentUser")?
      JSON.parse(sessionStorage.getItem("currentUser")).token:null
      //false token is invalid , true //token is valid
      if (this.jwtHelerService.isTokenExpired() ) {
        return false;
      } else {
        return true;
      }
    }
}