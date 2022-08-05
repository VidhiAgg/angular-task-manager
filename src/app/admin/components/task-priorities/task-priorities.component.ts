import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import *as $ from "jquery";
import { TaskPriority } from 'src/app/models/task-priority';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TaskPriorityService } from 'src/app/services/task-priority.service';


@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss']
})
export class TaskPrioritiesComponent implements OnInit {

 

  //objects for holding the data in model data
  taskPriorities: TaskPriority[] = [];
  showLoading: boolean = true;
  
  //objects for delete model popup
  deleteTaskPriority : TaskPriority = new TaskPriority();
  editIndex :  number = null;
  deleteIndex: number = null;
  
  //objects for seaching
  searchBy : string = "taskPriorityName";
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
  sortBy: string = "taskPriorityName";
  sortOrder :  string = "ASC"; //ASC || DSC
    constructor(private taskPriorityService: TaskPriorityService,
      private formBuilder :  FormBuilder) { }
  
    
    ngOnInit(): void {
      //get data from database
      this.taskPriorityService.getTaskPriorities().subscribe(
        (response : TaskPriority[]) =>{
          this.taskPriorities = response;
          this.showLoading = false;
          this.calculatePages();
        });
      
      //create newForm
      this.newForm = this.formBuilder.group({
        taskPriorityID: this.formBuilder.control(null),
        taskPriorityName : this.formBuilder.control(null, [Validators.required])
      });
      
      //create editForm
      this.editForm = this.formBuilder.group({
        taskPriorityID: this.formBuilder.control(null),
        taskPriorityName : this.formBuilder.control(null, [Validators.required])
      });
  
  
  
    }
    
  //get no. of pages
    calculatePages(){
       //Get no. of Pages
      let filterPipe = new FilterPipe();
          var noOfPages = Math.ceil(filterPipe.transform(this.taskPriorities, this.searchBy, this.searchText).length  / this.pageSize);
      
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
      this.newForm.reset({taskPriorityID: 0});
      setTimeout(() => {
        //Focus the clientLocation textBox in newForm
        this.defaultTextBox_New.nativeElement.focus();
      }, 100);
    }
    onSaveClick(){
      if(this.newForm.valid){
        //Invoke the RST-API Call
        this.taskPriorityService.insertTaskPriority(this.newForm.value).subscribe((response)=>{
          //Add response to grid
          var taskPriorityGrid : TaskPriority = new TaskPriority();
          taskPriorityGrid.taskPriorityID = response.taskPriorityID;
          taskPriorityGrid.taskPriorityName = response.taskPriorityName;
          this.taskPriorities.push(taskPriorityGrid);
  
          //Reset the newForm
          this.newForm.reset();
          $("#newtaskPriorityFormCancel").trigger("click");
          this.calculatePages(); //To caluculate the updated page number
        },(error)=>{
          console.log(error);
        });
      }
    }
    
    onEditClick(event, taskPriority : TaskPriority){
      //Reset the edit form
      this.editForm.reset();
      setTimeout(()=>{
        //setData to editForm
        this.editForm.patchValue(taskPriority); //patch the county object into the EditForm
        this.editIndex = this.taskPriorities.indexOf(taskPriority);
  
        //Focus the clientLocationtextBox in editForm
        this.defaultTextBox_Edit.nativeElement.focus();
      },100);
        
    }
  
    onUpdateClick(){
      if(this.editForm.valid)
      {
        //invoke the rest-api call
        this.taskPriorityService.updateTaskPriority(this.editForm.value).subscribe((response : TaskPriority)=>{
  
          //update the response in grid
          this.taskPriorities[this.editIndex] = response;
  
          //reset the edit form
          this.editForm.reset();
          $("#editTaskPriorityFormCancel").trigger("click");
        },(error)=>{
          console.log(error);
        })
      }
    }
  
    onDeleteClick(event, taskPriority: TaskPriority){
  
      //set data into deleteTaskPriority
      this.deleteTaskPriority.taskPriorityID = taskPriority.taskPriorityID;
      this.deleteTaskPriority.taskPriorityName = taskPriority.taskPriorityName;
      this.deleteIndex = this.taskPriorities.indexOf(taskPriority);
    }
  
    onDeleteConfirmClick(){
      //invoke the rst-api call
      this.taskPriorityService.deleteTaskPriority(this.deleteTaskPriority.taskPriorityID).subscribe((response)=>{
        //delete the object in Grid
        this.taskPriorities.splice(this.deleteIndex,1);
  
        //clear delete taskPriority
        this.deleteTaskPriority.taskPriorityID = null;
        this.deleteTaskPriority.taskPriorityName = null;
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