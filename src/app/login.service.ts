import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:any="http://localhost:9090/authenticate";
  constructor(private httpClient: HttpClient) { 

    
  }
  currentUserName: any=null;
  public login(loginView: LoginViewModel):Observable<any>{
    return this.httpClient.post<any>(this.url,loginView,{responseType:"json"})
    .pipe(map(user =>{
      if(user)
      {
        this.currentUserName=user.userName;
      }
      return user;
    }));
  }
    /**
     * logout
     */
    public logout():void {
      this.currentUserName=null;
    }
}