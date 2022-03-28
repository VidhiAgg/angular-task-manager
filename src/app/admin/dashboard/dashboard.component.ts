import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  designation: string;
  username: string;
  noOfTeamMembers: number;
  totalCostOfAllProjects: number;
  pendingTask:number;
  upComingProjects: number;
  projectCost: number;
  currentExp: number;
  availFunds: number;
  toDay:Date;
  clients: string[]=[];
  projects:string[]=[];
  year:string[]=[];
  teamDetails:any=[];
  teamMembers:any[]=[];

  constructor(private dashboardService: DashboardService) {

   }

  ngOnInit(): void {
    this.designation="Team leader";
    this.username=" John Smith";
    this.noOfTeamMembers=10;
    this.designation="Manager";
    this.availFunds=40000;
    this.currentExp=5000;
    this.pendingTask=5;
    this.projectCost=30000;
    this.totalCostOfAllProjects=24900;
    this.upComingProjects=3;
    this.toDay=new Date();

    this.clients=[
      "ABC","PQT","ZSER"
    ];
    this.projects=[
      "Project A","Project B","Project C","Project D"
    ];
    this.year=["2022","2020","2019","2018","2017"];
  
  this.teamDetails=this.dashboardService.getTeamSummary()
  this.teamMembers=this.dashboardService.getTeamMembers();
  }
  onProjectChange($event)
  {
    if($event.target.innerHTML=="Project A")
    {
      this.availFunds = 40000;
      this.currentExp = 5000;
      this.projectCost = 30000;
    }
    if($event.target.innerHTML=="Project B")
    {
      this.availFunds = 60000;
      this.currentExp = 7000;
      this.projectCost = 36700;
    }
    if($event.target.innerHTML=="Project C")
    {
      this.availFunds = 10000;
      this.currentExp = 1000;
      this.projectCost = 2000;
    }
    if($event.target.innerHTML=="Project D")
    {
      this.availFunds = 89000;
      this.currentExp = 3400;
      this.projectCost = 9800;
    }
  }
}
