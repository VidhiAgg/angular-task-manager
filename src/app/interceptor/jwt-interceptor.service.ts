import { HttpBackend, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService  implements HttpInterceptor{

  constructor(private httpBackend: HttpBackend) { }
  /*
  req : current req that is being sent
  HttpRequest -> the rq type is of HTTPRequest
  <any> -> represents the response type. that means can recieve any types of data as response as sometmies it is single project
            or sometimes it is multiple projects
  next -> is of HTTPHandler type; 
          Represens the next intercept in case of multiple interceptor (if there, else represents HttpXhrHeader)
  Observable<HttpEvent<any>> -> Return the type of intercept, which means that req is going to produce a series of
                              HttpResponse, HttpHeaderResponse etc
                          */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = {token: ""};
    //Reading the currentUser from the session Storage, so that able to access currentUser.token
    if(sessionStorage['currentUser'] !=null){
      currentUser = JSON.parse(sessionStorage['currentUser']);
    }
    req = req.clone({
      setHeaders : {Authorization : "Bearer "+currentUser.token
      }
    }
    );
    //invokes the next interceptor if any otherwise httpXhrHeader
    //that means request wil be send to the server
    return next.handle(req);
  }
}
