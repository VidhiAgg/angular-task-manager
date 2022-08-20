import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor(private loginService: LoginService) { }
  /**
   * minimumAgeValidator
   */
  public minimumAgeValidator(minAge: number):ValidatorFn {
    return(control : AbstractControl): ValidationErrors | null => {
      // represents actual dob. enterd by user during run time
      if (!control.value) {
        return null; //if dob is null 
      }
      var today = new Date();
      //get dob entered in form
      var dob = new Date(control.value)
      var diffMilliSeconds = Math.abs(today.getTime() - dob.getTime());
      var diffYears = (diffMilliSeconds / (1000 * 60 * 60 * 24)) / 365.25;
       console.log(diffMilliSeconds, diffYears
        );
        if (diffYears >= minAge)
        return null; //valid
      else
        return { minAge: { valid: false } }; //invalid
    };
  }

  public compareValidator(controlToValidate: string, controlToCompare: string):ValidatorFn {
    //applying to entire form group rather than single form control.
    return(formGroup: FormGroup): ValidationErrors | null => {
      // represents actual dob. enterd by user during run time
      if (!(formGroup.get(controlToValidate)as FormControl).value) {
        return null; //return, if confrm password is null 
      }

      if (formGroup.get(controlToValidate).value == formGroup.get(controlToCompare).value) {
        console.log(true);
        return null; //if same thanvalid return null
      }
      else
        {
          formGroup.get(controlToValidate).setErrors({
            compareValidator : {valid :false}});
          }
          return{ compareValidator : {valid : false}}; //invalid
        }
    }
    public duplicateEmailValidator():AsyncValidatorFn {
      //applying to entire form group rather than single form control.
      return(control: AbstractControl): Observable <ValidationErrors | null> => {
        return this.loginService.getUserByEmail(control.value).pipe(
          map((existingUser : any) =>
          {
            if (existingUser != null) {
              //control.setErrors({uniqueEmail: {valid : false}}); //setting validation in textbox
             //line 63 optional, as applied directly to the textbox
              return {uniqueEmail : {valid: false}}; //invalid
            } else {
              return null;
            }
          }));
      };
    }
  }
