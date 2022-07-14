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
        //convert view children as array
        var componentLoaderArray = this.componentLoader.toArray();
        console.log(componentLoaderArray);
        var componenetFactory = this.componentFactoryResolver.resolveComponentFactory(clickedMenuItem.component);
        //viewContainerRef prop created in componentLoader directive and we are accessing in the same
        var viewContRef = componentLoaderArray[this.tabs.length-1].viewContainerRef;
        // will render the com. based on viewContainerRef
        var componentRef =  viewContRef.createComponent(componenetFactory);
        if (clickedMenuItem.component.name == "CountriesComponent") {
          var componentInstance = componentRef.instance as CountriesComponent;//typecast componentRef.instance property as CountriesComponent
          componentInstance.message = "Hello to Countries" 
          
        }
        //console.log(clickedMenuItem.component.name);
        //console.log(clickedMenuItem);
      }, 100);
    }
    
  }
}
