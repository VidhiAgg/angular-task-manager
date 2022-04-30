import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuardService implements CanActivate {

  constructor(private loginService: LoginService,
    private router : Router) { }
/*
ActivatedRouteSnapshot -> if u want to read the details about the current working routeto which the 
                          user wants to navigate, using which you can access the details of the particular route,
                           to which the user wants to navigate4
  RouterStateSnapshot  ->                       
*/
    canActivate(route: ActivatedRouteSnapshot): boolean 
    {
       console.log(this.router.url)
      if (this.loginService.isAuthenticated()) {
        console.log("hiiii in if part ");
        return true; // the user can navigate to the particular route
        
      } else {
        console.log("hi in else part");
        this.router.navigate(["login"]);
        return false; // the user cannot navigate to the particular route
      }
    }
}
