import { Component, OnInit } from '@angular/core';

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
  {itemName : "Countries", displayName: "Countries" },
  {itemName : "ClientLocations", displayName: "Client Locations" },
  {itemName : "TaskStatus", displayName: "Task Status" },
  {itemName : "TaskPriorities", displayName: "Task Priorities" }
];
//to store the name of Active Menu item selected by user
activeItem : string;

  constructor() { }

  ngOnInit(): void {
  }

}
