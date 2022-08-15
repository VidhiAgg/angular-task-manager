import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientLocation } from 'src/app/models/client-location';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ClientLocationService } from 'src/app/services/client-location.service';
import *as $ from "jquery";

@Component({
  selector: 'app-client-locations',
  templateUrl: './client-locations.component.html',
  styleUrls: ['./client-locations.component.scss']
})
export class ClientLocationsComponent implements OnInit {

  //objects for holding the data in model data
clientLocations: ClientLocation[] = [];
showLoading: boolean = true;

//objects for delete model popup
deleteClientLocation : ClientLocation = new ClientLocation();
editIndex :  number = null;
deleteIndex: number = null;

//objects for seaching
searchBy : string = "clientLocationName";
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

//sorting
sortBy: string = "clientLocationName";
sortOrder: string = "ASC";

  constructor(private clientLocationService: ClientLocationService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    //get data from the database
    this.clientLocationService.getClientLocation().subscribe((response :
    ClientLocation[])=>{
      this.clientLocations =  response;
      this.showLoading = false;
      this.calculatePages();
    })
     //create newForm
     this.newForm = this.formBuilder.group({
      clientLocationID: this.formBuilder.control(null),
      clientLocationName : this.formBuilder.control(null, [Validators.required])
    });
    
    //create editForm
    this.editForm = this.formBuilder.group({
      clientLocationID: this.formBuilder.control(null),
      clientLocationName : this.formBuilder.control(null, [Validators.required])
    });

  }

  calculatePages(){
    //Get no. of Pages
   let filterPipe = new FilterPipe();
       var noOfPages = Math.ceil(filterPipe.transform(this.clientLocations, this.searchBy, this.searchText).length  / this.pageSize);
   
       this.pages = [];
       for (let i = 0; i < noOfPages; i++)
       {
         
         this.pages.push( { pageIndex: i });
       }
       console.log(this.pages);
   
       this.currentPageIndex = 0;
  }
  //for assigning the clicked page Index into the current
  //pageIndex property to chang page number
  onPageIndexClicked(ind: number){
    //set CurrentpageIndex
    if(ind >= 0 && ind <this.pages.length)
    {
      this.currentPageIndex = ind;
    }
  }
//Reset the form and places focus in clientLocationName in popup
  onNewClick(event){
    //reset the form
    this.newForm.reset({clientLocationID: 0});
    setTimeout(() => {
      //Focus the clientLocation textBox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }
  onSaveClick(){
    if(this.newForm.valid){
      //Invoke the RST-API Call
      this.clientLocationService.insertClientLocation(this.newForm.value).subscribe((response)=>{
        //Add response to grid
        var clientLocationGrid : ClientLocation = new ClientLocation();
        clientLocationGrid.clientLocationID = response.clientLocationID;
        clientLocationGrid.clientLocationName = response.clientLocationName;
        this.clientLocations.push(clientLocationGrid);

        //Reset the newForm
        this.newForm.reset();
        $("#newClientLocationModal").trigger("click");
        this.calculatePages(); //To caluculate the updated page number
      },(error)=>{
        console.log(error);
      });
    }
  }
  onEditClick(event, clientLocation : ClientLocation){
    //Reset the edit form
    this.editForm.reset();
    setTimeout(()=>{
      //setData to editForm
      this.editForm.patchValue(clientLocation); //patch the county object into the EditForm
      this.editIndex = this.clientLocations.indexOf(clientLocation);

      //Focus the clientLocationtextBox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    },100);
      
  }

  onUpdateClick(){
    if(this.editForm.valid)
    {
      //invoke the rest-api call
      this.clientLocationService.updateClientLocation(this.editForm.value).subscribe((response : ClientLocation)=>{

        //update the response in grid
        this.clientLocations[this.editIndex] = response;

        //reset the edit form
        this.editForm.reset();
        $("#editClientLocationModal").trigger("click");
      },(error)=>{
        console.log(error);
      })
    }
  }

  onDeleteClick(event, clientLocation: ClientLocation){

    //set data into deleteclientLocation
    this.deleteClientLocation.clientLocationID = clientLocation.clientLocationID;
    this.deleteClientLocation.clientLocationName = clientLocation.clientLocationName;
    this.deleteIndex = this.clientLocations.indexOf(clientLocation);
  }

  onDeleteConfirmClick(){
    //invoke the rst-api call
    this.clientLocationService.deleteClientLocation(this.deleteClientLocation.clientLocationID).subscribe((response)=>{
      //delete the object in Grid
      this.clientLocations.splice(this.deleteIndex,1);

      //clear delete clientLocation
      this.deleteClientLocation.clientLocationID = null;
      this.deleteClientLocation.clientLocationName = null;
      $("#deleteClientLocationModal").trigger("click");

      this.calculatePages();
    },(error)=>{
      console.log(error);
    })
  }
//will execute whenever we type something in the searchBox
  onSearchTextChange(event){
    //Recall the calcultaeNo.pAGES
    this.calculatePages();
  }


}
