import { ClientLocation } from "./client-location";

export class Project {
    projectID:number;
    projectName:string;
    dateOfStart:string;
    teamSize: number;
    active: boolean;
    status: string;
    clientLocationID: number| any;
    //includes property that contains the parent record i.e. clientLocationID & clientLocationName
    clientLocation: ClientLocation | any;
    constructor(){
        this.projectID=0;
        this.projectName=null;
        this.teamSize=0;
        this.dateOfStart=null;
        this.clientLocationID = null;
        this.active = true;
        this.status = null;
        this.clientLocation = new ClientLocation();
    }
}
