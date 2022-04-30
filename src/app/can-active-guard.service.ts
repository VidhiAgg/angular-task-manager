import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuardService implements CanActivate {

  constructor(private loginService: LoginService,
    private router : Router,
    private route: ActivatedRouteSnapshot) { }
/*
ActivatedRouteSnapshot -> if u want to read the details about the current working routeto which the 
                          user wants to navigate, using which you can access the details of the particular route,
                           to which the user wants to navigate4
  RouterStateSnapshot  ->                       
*/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
    {
       console.log(this.router.url)
      if (this.loginService.isAuthenticated()) {
        return true; // the user can navigate to the particular route
        
      } else {
        this.router.navigate(["login"]);
        return false; // the user cannot navigate to the particular route
      }
    }
}
