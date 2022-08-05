import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import *as $ from "jquery";
import { TaskPriority } from 'src/app/models/task-priority';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TaskPriorityService } from 'src/app/services/task-priority.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}

