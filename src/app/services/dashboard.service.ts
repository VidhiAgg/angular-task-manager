import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable()
export class DashboardService {
getTeamSummary():any[]{
 var teamDetails=[
    {region: "East",teamMembersCount:20, unavailMembers:4},  {region: "North",teamMembersCount:20, unavailMembers:10},
    {region: "West",teamMembersCount:10, unavailMembers:40},  {region: "South",teamMembersCount:20, unavailMembers:10}
  ];
  return teamDetails;
}
getTeamMembers():any[]{
  var teamMembersDetails=[
    {region:"East", members:[
      {ID:1, name:"John",status:"Available"},
      {ID:2, name:"Smith",status:"Available"},
      {ID:3, name:"Alexa",status:"Busy"},
      {ID:4, name:"Ruby",status:"Busy"}
    ]}, {region:"West", members:[
      {ID:1, name:"John",status:"Available"},
      {ID:2, name:"Smith",status:"Available"},
      {ID:3, name:"Alexa",status:"Busy"},
      {ID:4, name:"Ruby",status:"Busy"}
    ]}, {region:"North", members:[
      {ID:1, name:"John",status:"Available"},
      {ID:2, name:"Smith",status:"Available"},
      {ID:3, name:"Alexa",status:"Busy"},
      {ID:4, name:"Ruby",status:"Busy"}
    ]},{region:"South", members:[
      {ID:1, name:"John",status:"Available"},
      {ID:2, name:"Smith",status:"Available"},
      {ID:3, name:"Alexa",status:"Busy"},
      {ID:4, name:"Ruby",status:"Busy"}
    ]}
  ];
  return teamMembersDetails;
}
}
