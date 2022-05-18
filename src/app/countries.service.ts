import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }
  //will be importing data from db for the list
 /* getCountries():Country[]
  {
    return [
      new Country(1,"India"),
      new Country(2,"UK"),
      new Country(3,"USA"),
      new Country(4,"Japan")
    ];
  }
  */
  getCountries():Observable<Country[]>
  {
    return this.httpClient.get<Country[]>("http://localhost:9090/api/countries", {
      responseType : "json"
    });
  }
}
