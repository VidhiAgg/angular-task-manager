import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { ClientLocationServiceValidatorDirective } from '../directives/client-location-service-validator.directive';
import { ProjectIDUniqueValidatorDirective } from '../directives/project-idunique-validator.directive';
import { NumberToWordPipe } from '../pipes/number-to-word.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { PagingPipe } from '../pipes/paging.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';
import { SortPipe } from '../pipes/sort.pipe';



@NgModule({
  declarations: [
    TeamSizeValidatorDirective,
    ClientLocationServiceValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    NumberToWordPipe,
    FilterPipe,
    PagingPipe,
   ComponentLoaderDirective,
   SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    
    TeamSizeValidatorDirective,
    ClientLocationServiceValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    NumberToWordPipe,
    FilterPipe,
    PagingPipe,   
    SortPipe,
   ComponentLoaderDirective,
  ]
})
export class SharedModule {

 }
