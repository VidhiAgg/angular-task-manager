import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location';


@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {
  urlPrefix: string = "http://localhost:9090"; 
  constructor(private httpClient : HttpClient) { }

  getClientLocation():Observable<ClientLocation[]>{
    return this.httpClient.get<ClientLocation[]>("http://localhost:9090/api/clientlocations",{responseType: "json"})
  }
  getClientLocationById(ClientLocationID: number):Observable<ClientLocation>{
    return this.httpClient.get<ClientLocation>(this.urlPrefix+"/api/clientlocations/searchbyclientlocationid/"+ ClientLocationID,{responseType: "json"})
  }

  insertClientLocation(newClientLocation : ClientLocation):Observable<ClientLocation>{
    return this.httpClient.post<ClientLocation>(this.urlPrefix+"/api/clientlocations"+ newClientLocation ,{responseType: "json"})
  }

  updateClientLocation(exsistingClientLocation : ClientLocation):Observable<ClientLocation>{
    return this.httpClient.patch<ClientLocation>(this.urlPrefix+"/api/clientlocations"+ exsistingClientLocation ,{responseType: "json"})
  }

  deleteClientLocation(clientLocationID: number):Observable<string>{
    return this.httpClient.delete<string>(this.urlPrefix+"/api/clientlocations?ClientLocationID"+clientLocationID);
  }

}
