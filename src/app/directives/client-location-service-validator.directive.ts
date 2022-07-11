import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appClientLocationServiceValidator]',
  providers: [{provide:NG_VALIDATORS, useExisting: ClientLocationServiceValidatorDirective, multi: true}]
})
export class ClientLocationServiceValidatorDirective implements Validators {

  constructor() { }

  validate(control:AbstractControl): ValidationErrors | null
  {
    let isValid = true;
    if(control.value.clientLocation == 6 && control.value.Status == 'Support')
    {
        isValid = false;  //invalid
    }
    if (isValid) {
      return null;
    }
    else{
      return {clientLocationStatus : {valis:false}};
    }
  }

}
