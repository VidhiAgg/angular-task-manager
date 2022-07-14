import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
 message: string = null; // will supply its value dynamically from master com 

  constructor() { }

  
  ngOnInit(): void {
  }
  ngOnDestroy(){
    console.log("ngOndestroy"); //in ordr to test whether the component is deleted or not
  }

}