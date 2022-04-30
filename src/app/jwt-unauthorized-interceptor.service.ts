import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtUnauthorizedInterceptorService implements HttpInterceptor {

  constructor() { }
  //Whenever we are making any request in the entire application, this intercept will execute automatically
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //by using pipe, we are catching the successfull response or error message
    //tap is an rxjs operator which reive two arrow functions
    //first one in case of successfull response
    //second one in case of unsuccessful i.e error response
    return next.handle(req).pipe(tap(
      (event:HttpEvent<any>)=>{
        if (event instanceof HttpResponse)
        {
          //do something with response
          //cam convert into camel case
        }
      },
      (error : any)=>{
        if(error instanceof HttpErrorResponse)
        {
          if (error.status == 401) {
            console.log(error);
            alert("401 UnAuthorized");
            
          } else {
            
          }
        }
      }
    ))
    
  }
}
