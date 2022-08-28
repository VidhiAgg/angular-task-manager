import { TaskStatus } from "./task-status";

export class TaskStatusDetail {
    taskStatusDetailID: number;
    taskID: number;
    taskStatusID : number;
    userID : string;
    description : string;
    taskStatus : TaskStatus;
    user : any;
    statusUpdationDateTimeString : string;

    constructor(){
        this.taskID = null;
        this.taskStatusDetailID = null;
        this.userID = null;
        this.user = null;
        this.description = null;
        this.taskStatus = null;
        this.statusUpdationDateTimeString = null;
    }
}
