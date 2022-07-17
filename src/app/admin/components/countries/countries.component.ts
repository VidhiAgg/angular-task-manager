import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CountriesService } from 'src/app/services/countries.service';
import *as $ from "jquery";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
// message: string = null; // will supply its value dynamically from master com

//objects for holding the data in model data
countries: Country[] = [];
showLoading: boolean = true;

//objects for delete model popup
deleteCountry : Country = new Country();
editIndex :  number = null;
deleteIndex: number = null;

//objects for seaching
searchBy : string = "countryName";
searchText :  string = "";

//prop for paging
currentPageIndex : number = 0;
pages : any[] =[];
pageSize : number = 5;

//properties for Reactive forms
newForm :  FormGroup | any = null;
editForm :  FormGroup | any = null;

//AutoFocus TextBoxes
@ViewChild("defaultTextBox_New") defaultTextBox_New : ElementRef;
@ViewChild("defaultTextBox_Edit")defaultTextBox_Edit : ElementRef;

//for sorting
sortBy: string = "countryName";
sortOrder :  string = "ASC"; //ASC || DSC
  constructor(private countryService: CountriesService,
    private formBuilder :  FormBuilder) { }

  
  ngOnInit(): void {
    //get data from database
    this.countryService.getCountries().subscribe(
      (response : Country[]) =>{
        this.countries = response;
        this.showLoading = false;
        this.calculatePages();
      }
    )
    //create newForm
    this.newForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName : this.formBuilder.control(null, [Validators.required])
    });
    
    //create editForm
    this.editForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName : this.formBuilder.control(null, [Validators.required])
    });



  }
  
//get no. of pages
  calculatePages(){
     //Get no. of Pages
    let filterPipe = new FilterPipe();
        var noOfPages = Math.ceil(filterPipe.transform(this.countries, this.searchBy, this.searchText).length  / this.pageSize);
    
        this.pages = [];
        for (let i = 0; i < noOfPages; i++)
        {
          
          this.pages.push( { pageIndex: i });
        }
        console.log(this.pages);
    
        this.currentPageIndex = 0;
      }

  onPageIndexClicked(ind: number){
    //set CurrentpageIndex
    if(ind >= 0 && ind <this.pages.length)
    {
      this.currentPageIndex = ind;
    }
  }

  onNewClick(event){
    //reset the form
    this.newForm.reset({countryID: 0});
    setTimeout(() => {
      //Focus the clientLocation textBox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }
  onSaveClick(){
    if(this.newForm.valid){
      //Invoke the RST-API Call
      this.countryService.insertCountry(this.newForm.value).subscribe((response)=>{
        //Add response to grid
        var countryGrid : Country = new Country();
        countryGrid.countryID = response.countryID;
        countryGrid.countryName = response.countryName;
        this.countries.push(countryGrid);

        //Reset the newForm
        this.newForm.reset();
        $("#newCountryFormCancel").trigger("click");
        this.calculatePages(); //To caluculate the updated page number
      },(error)=>{
        console.log(error);
      });
    }
  }
  
  onEditClick(event, country : Country){
    //Reset the edit form
    this.editForm.reset();
    setTimeout(()=>{
      //setData to editForm
      this.editForm.patchValue(country); //patch the county object into the EditForm
      this.editIndex = this.countries.indexOf(country);

      //Focus the clientLocationtextBox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    },100);
      
  }

  onUpdateClick(){
    if(this.editForm.valid)
    {
      //invoke the rest-api call
      this.countryService.updateCountry(this.editForm.value).subscribe((response : Country)=>{

        //update the response in grid
        this.countries[this.editIndex] = response;

        //reset the edit form
        this.editForm.reset();
        $("#editCountryFormCancel").trigger("click");
      },(error)=>{
        console.log(error);
      })
    }
  }

  onDeleteClick(event, country: Country){

    //set data into deleteCountry
    this.deleteCountry.countryID = country.countryID;
    this.deleteCountry.countryName = country.countryName;
    this.deleteIndex = this.countries.indexOf(country);
  }

  onDeleteConfirmClick(){
    //invoke the rst-api call
    this.countryService.deleteCountry(this.deleteCountry.countryID).subscribe((response)=>{
      //delete the object in Grid
      this.countries.splice(this.deleteIndex,1);

      //clear delete country
      this.deleteCountry.countryID = null;
      this.deleteCountry.countryName = null;
      this.calculatePages();
    },(error)=>{
      console.log(error);
    })
  }

  onSearchTextChange(event){
    //Recall the calcultaeNo.pAGES
    this.calculatePages();
  }

  /*ngOnDestroy(){
    console.log("ngOndestroy"); //in ordr to test whether the component is deleted or not
  }*/

}
