import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  urlPrefix: string = "http://localhost:9090";
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
  getCountryById(countryID: number):Observable<Country>{
    return this.httpClient.get<Country>(this.urlPrefix + "/api/countries/searchbycountryid/" + countryID, {responseType:"json"})
  }
  insertCountry(newCountry: Country):Observable<Country>{
    return this.httpClient.post<Country>(this.urlPrefix + "/api/countries",{responseType: "json"});
  }
  updateCountry(exsitingCountry: Country):Observable<Country>{
    return this.httpClient.post<Country>(this.urlPrefix + "/api/countries",exsitingCountry,{responseType: "json"});

  }
  deleteCountry(countryID: number):Observable<string>{
    return this.httpClient.delete<string>(this.urlPrefix + "/api/countries?CountryID=" +countryID);

  }
}
