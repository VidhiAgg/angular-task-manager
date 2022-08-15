import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskStatus } from 'src/app/models/task-status';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TaskStatusService } from 'src/app/services/task-status.service';
import *as $ from "jquery";

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {

  //objects for holding the data in model data
  taskStatuses: TaskStatus[] = [];
  showLoading: boolean = true;
  
  //objects for delete model popup
  deleteTaskStatus : TaskStatus = new TaskStatus();
  editIndex :  number = null;
  deleteIndex: number = null;
  
  //objects for seaching
  searchBy : string = "taskStatusName";
  searchText :  string = "";
  
  //prop for paging
  currentPageIndex : number = 0;
  pages : any[] =[];
  pageSize : number = 5;
  
  //properties for Reactive forms
  newForm :  FormGroup | any = null;
  editForm :  FormGroup | any = null;
  
  //AutoFocus TextBoxes
  @ViewChild("defaultTextBox_New") defaultTextBox_New : ElementRef;
  @ViewChild("defaultTextBox_Edit")defaultTextBox_Edit : ElementRef;
  
  //for sorting
  sortBy: string = "taskStatusName";
  sortOrder :  string = "ASC"; //ASC || DSC

  constructor(private taskStatusService : TaskStatusService,
    private formBuilder :  FormBuilder) { }

  ngOnInit(): void {

    //get data from database
    this.taskStatusService.getTaskStatuses().subscribe(
      (response : TaskStatus[]) =>{
        this.taskStatuses = response;
        this.showLoading = false;
        this.calculatePages();
      });
    
    //create newForm
    this.newForm = this.formBuilder.group({
      taskStatusID: this.formBuilder.control(null),
      taskStatusName : this.formBuilder.control(null, [Validators.required])
    });
    
    //create editForm
    this.editForm = this.formBuilder.group({
      taskStatusID: this.formBuilder.control(null),
      taskStatusName : this.formBuilder.control(null, [Validators.required])
    });



  }
  
//get no. of pages
  calculatePages(){
     //Get no. of Pages
    let filterPipe = new FilterPipe();
        var noOfPages = Math.ceil(filterPipe.transform(this.taskStatuses, this.searchBy, this.searchText).length  / this.pageSize);
    
        this.pages = [];
        for (let i = 0; i < noOfPages; i++)
        {
          
          this.pages.push( { pageIndex: i });
        }
        console.log(this.pages);
    
        this.currentPageIndex = 0;
      }

  onPageIndexClicked(ind: number){
    //set CurrentpageIndex
    if(ind >= 0 && ind <this.pages.length)
    {
      this.currentPageIndex = ind;
    }
  }

  onNewClick(event){
    //reset the form
    this.newForm.reset({taskStatusID: 0});
    setTimeout(() => {
      //Focus the clientLocation textBox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }
  onSaveClick(){
    if(this.newForm.valid){
      //Invoke the RST-API Call
      this.taskStatusService.insertTaskStatus(this.newForm.value).subscribe((response)=>{
        //Add response to grid
        var taskStatusGrid : TaskStatus = new TaskStatus();
        taskStatusGrid.taskStatusID = response.taskStatusID;
        taskStatusGrid.taskStatusName = response.taskStatusName;
        this.taskStatuses.push(taskStatusGrid);

        //Reset the newForm
        this.newForm.reset();
        $("#newTaskStatusForm").trigger("click");
        this.calculatePages(); //To caluculate the updated page number
      },(error)=>{
        console.log(error);
      });
    }
  }
  
  onEditClick(event, taskStatus : TaskStatus){
    //Reset the edit form
    this.editForm.reset();
    setTimeout(()=>{
      //setData to editForm
      this.editForm.patchValue(taskStatus); //patch the taskStatus object into the EditForm
      this.editIndex = this.taskStatuses.indexOf(taskStatus);

      //Focus the taskStatustextBox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    },100);
      
  }

  onUpdateClick(){
    if(this.editForm.valid)
    {
      //invoke the rest-api call
      this.taskStatusService.updateTaskStatus(this.editForm.value).subscribe((response : TaskStatus)=>{

        //update the response in grid
        this.taskStatuses[this.editIndex] = response;

        //reset the edit form
        this.editForm.reset();
        $("#editTaskStatusForm").trigger("click");
      },(error)=>{
        console.log(error);
      })
    }
  }

  onDeleteClick(event, taskStatus: TaskStatus){

    //set data into deleteTaskStatus
    this.deleteTaskStatus.taskStatusID = taskStatus.taskStatusID;
    this.deleteTaskStatus.taskStatusName = taskStatus.taskStatusName;
    this.deleteIndex = this.taskStatuses.indexOf(taskStatus);
  }

  onDeleteConfirmClick(){
    //invoke the rst-api call
    this.taskStatusService.deleteTaskStatus(this.deleteTaskStatus.taskStatusID).subscribe((response)=>{
      //delete the object in Grid
      this.taskStatuses.splice(this.deleteIndex,1);

      //clear delete taskStatus
      this.deleteTaskStatus.taskStatusID = null;
      this.deleteTaskStatus.taskStatusName = null;
      this.editForm.reset();
      //$("#deleteTaskStatusModal").trigger("click");
      this.calculatePages();
    },(error)=>{
      console.log(error);
    })
  }

  onSearchTextChange(event){
    //Recall the calcultaeNo.pAGES
    this.calculatePages();
  }

}
