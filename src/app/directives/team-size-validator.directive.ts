import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers: [{provide:NG_VALIDATORS, useExisting: TeamSizeValidatorDirective, multi: true}]
})
export class TeamSizeValidatorDirective implements Validators {

  constructor() { }
  //AbstractControl -> base class for all types of forms elements in angular
  //at execution time, automaticaly angular will invoke the validate" method and also pass the input
  //tag as parameter to the "validate" method.
  @Input("appTeamSizeValidator") n: number | any; //to pass the value into the property decorated witj @input()

  validate(control:AbstractControl): ValidationErrors | null
  {
    let currentValue = control.value;
   // let isValid = currentValue % this.n == 0;
   let isValid = currentValue  != 0;
    if (isValid) {
      return null; //valid
    } else {
      return {divisible: {valid: false}}; //invalid /divisible contains the name of thr error, which will be added to the
      //"error" property of the particular element.
    }


  }

}
