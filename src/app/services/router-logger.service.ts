import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {
  currentuserName: string = null;
  constructor(private httpcLient: HttpClient,
    private httpBackednd : HttpBackend) { }

  public log(logMsg : string):Observable<any>{
    //instantiate httpClient based on HttpBackend
    //BEcause want to skip all the interceptor
    this.httpcLient = new HttpClient(this.httpBackednd);
    return this.httpcLient.post("api/routerlogger",logMsg,
    {headers: new HttpHeaders().set("content-type","text/plain")})
  }

}
