import { ClientLocation } from "./client-location";

export class Project {
    projectID: number | any;
    projectName: string | any;
    dateOfStart: string | any;
    teamSize: number | any;
    active: boolean | any;
    status: string | any;
    clientLocationID: number | any;
    clientLocation: ClientLocation | any;
    //includes property that contains the parent record i.e. clientLocationID & clientLocationName
    constructor(){
        this.projectID = null;
        this.projectName = null;
        this.dateOfStart = null;
        this.teamSize = null;
        this.active = true;
        this.status = null;
        this.clientLocationID = null;
        this.clientLocation = new ClientLocation();
    }
}

