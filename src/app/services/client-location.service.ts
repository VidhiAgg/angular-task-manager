import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location';


@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {

  constructor(private httpClient : HttpClient) { }
  getClientLocation():Observable<ClientLocation[]>{
    return this.httpClient.get<ClientLocation[]>("http://localhost:9090/api/clientlocations",{responseType: "json"})

  }
}
