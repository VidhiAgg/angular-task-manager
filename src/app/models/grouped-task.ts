import { Tasks } from "./tasks";

export class GroupedTask {
    taskStatusName : number;
    tasks : Tasks[];
    constructor(){
        this.taskStatusName = null;
        this.tasks = null;
    }
}
