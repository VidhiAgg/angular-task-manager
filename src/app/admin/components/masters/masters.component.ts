import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ComponentLoaderDirective } from 'src/app/directives/component-loader.directive';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { CountriesComponent } from '../countries/countries.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {
/*
it is loaded statically but other comonent like countries, clientLocations, taskpriorties,taskstatus will be loaded dynamically
*/
//in this each elements represents a menu item, itemNmae for identification
//display anme for displaying the Men item to the user
masterMenu = [
  {itemName : "Countries", displayName: "Countries", component: CountriesComponent  },
  {itemName : "ClientLocations", displayName: "Client Locations", component: ClientLocationsComponent  },
  {itemName : "TaskStatus", displayName: "Task Status", component: TaskStatusComponent},
  {itemName : "TaskPriorities", displayName: "Task Priorities", component: TaskPrioritiesComponent }
];
//to store the name of Active Menu item selected by user
activeItem : string;
//will store the list of tabs as of array
tabs=[];
//Create a viewChildren prop which represents all instance of the componentLoader directive rendered in ngTemplate
// componentFactoryResolver  for dynamiclly loading component
@ViewChildren(ComponentLoaderDirective) componentLoader : QueryList<ComponentLoaderDirective>;
  constructor(private componentFactoryResolver : ComponentFactoryResolver) { }

  ngOnInit(): void {
  }
  menuItemClick(clickedMenuItem:any){
    this.activeItem =  clickedMenuItem.itemName;
    //console.log(clickedMenuItem);
    //the problem i whenever we  click it will create duplicate
    //we will chk whether this is added or not
    //we use filter method for that
    let matchingTabs =this.tabs.filter((tab) =>{
      return tab.itemName == clickedMenuItem.itemName
    });
    //if true adding new tab than only adding 
    if (matchingTabs.length == 0) {
      this.tabs.push({
        tabIndex : this.tabs.length,
        itemName : clickedMenuItem.itemName,
        displayName : clickedMenuItem.displayName
      });

      setTimeout(() => {
        
        var componentLoaderArray = this.componentLoader.toArray(); //convert view children as array
       // console.log(componentLoaderArray);
        var componenetFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMenuItem.component);

        var viewContRef = componentLoaderArray[this.tabs.length-1].viewContainerRef;//viewContainerRef prop
        // created in componentLoader directive and we are accessing in the same

        var componentRef =  viewContRef.createComponent(componenetFactory); // will render the component based on viewContainerRef
        
        
        this.tabs[this.tabs.length-1].viewContainerRef = viewContRef; // will store in the tab element so that we can access the  viewContainerRef and
        // call the remove method for deleting the component

        console.log(this.tabs[this.tabs.length-1].viewContainerRef);
        
        if (clickedMenuItem.component.name == "CountriesComponent") {
          var componentInstance = componentRef.instance as CountriesComponent;//typecast componentRef.instance property as CountriesComponent
          componentInstance.message = "Hello to Countries" 
          
        }
        //console.log(clickedMenuItem.component.name);
        //console.log(clickedMenuItem);
      }, 100);
    } 
  }
  onClickClose(clickedTab : any ){
    console.log(clickedTab);
    
    clickedTab.viewContainerRef.remove(); // to delete it from memory
    this.tabs.splice(this.tabs.indexOf(clickedTab),1)  //to delete from the bootstrap
    if (this.tabs.length > 0) {
      this.activeItem = this.tabs[0].itemName;
      
    }



  }
}
