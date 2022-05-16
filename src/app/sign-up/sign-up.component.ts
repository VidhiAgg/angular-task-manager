import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup | any = null;
  gender =["Male","Female"];
  countries: Country[] = [];

  constructor(private countryServices: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countryServices.getCountries();
    this.signUpForm = new FormGroup({
      personName :  new FormGroup({
        firstName : new FormControl(null),
      lastName : new FormControl(null),
      }),
      email : new FormControl(null),
      phoneNumber : new FormControl(null),
      dob : new FormControl(null),
      gender: new FormControl(null),
      countryID : new FormControl(null),
      receiveNewsLetters : new FormControl(null),
      skills: new FormArray([])
    });
    this.signUpForm.valueChanges.subscribe((value:any) =>{
     // console.log(value);
    });
  }
  onSubmitClick(){
    //display current form value
    //console.log(this.signUpForm.value);
    //for using setValue all the values for all the form controls
    //in the entire form group must be supply
    /* this.signUpForm.setValue({
      firstName : "XYZ",
      lastName: "Smith",
      email:"xyz@smith.com",
      phoneNumber: "235678910",
      dob : "2020-01-01",
      gender : "Male",
      countryID: 3,
      receiveNewsLetters: true

    });*/
//will update onl set of form controls
    /*this.signUpForm.setValue({
      firstName : "XYZ",
      lastName: "Smith",
      email:"xyz@smith.com"
    });

*/
/*this.signUpForm.reset();
this.signUpForm.reset({
  firstName : "XYZ",
  lastName: "Smith",
  email:"xyz@smith.com"
});
*/
  }
  onAddSkill(){
    var formGroup = new FormGroup({
      skillName : new FormControl(null),
      level: new FormControl(null)
    });
    //typecast the result into form array type, 
    //for getting the form array programmatically
    //place them in () and than can access all the methods
    // using push method
    //formGroup represent one skill and we are adding that in form array

    (<FormArray>this.signUpForm.get("skills")).push(formGroup)
  }
  onRemoveClick(index: number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);


  }

}
