import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


//created interface because we need force the component to have a property canLeave
//and this interface wil be implementated in SignComponent 
//that means it should contain the can;eave prop
//interface wil accesible to any other componenet as we havent specified any name in the canDeactivateGuardService
export interface CanComponentDeactivate {
  //canLeave indicates whether the user can Leave the current working or not.
  canLeave:Boolean;
}
@Injectable({
  providedIn: 'root'
})
//implemet interface canDeactivate and specify the interface which contains canLeave property
 
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
  //canLeave indicates whether the user can Leave the current working or not.
  canLeave:Boolean;

  constructor() { }
  //predefined interface contain a method, which will executeb4 leaving the current route
  canDeactivate(component: CanComponentDeactivate) {
    if (component.canLeave == true) {
      return true; //user can leave the current route
    }
    else{
      return confirm("Do you want to discard changes?"); //its a js confirm dialog 
      // if yes -> return true else false
      //and the same will be return to the angular router
    }
}
}
