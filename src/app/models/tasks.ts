import { Project } from "./project";
import { TaskPriority } from "./task-priority";

export class Tasks {
    taskID : number;
    taskName: string;
    description : string;
    createdOn : string;
    projectID : number;
    createdBy : string;
    assigndTo : string;
    lastUpdatedOn: string;
    taskPriorityID: number;
    currentStatus : string;
    currentStatusID: number;
    taskPriority : TaskPriority;

    project : Project;
    createdByUser : any;
    assignedToUser : any;
    taskStatusDetail : any;

    constructor(){
        this.taskID = null;
        this.taskName= null;
        this.description = null;
        this.createdOn = null;
        this.projectID = null;
        this.createdBy = null;
        this. assigndTo = null;
        this.lastUpdatedOn= null;
        this.taskPriorityID= null;
        this.currentStatus = null;
        this.currentStatusID= null;
        this.project = null;
        this.createdByUser = null;
        this.assignedToUser = null;
        this.taskStatusDetail = null;
        this.taskPriority = null;
    
    }
}
