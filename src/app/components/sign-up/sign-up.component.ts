import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/can-deactivate-guard.service';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country';
import { CustomValidatorsService } from '../../services/custom-validators.service' ;
import { LoginService } from '../../services/login.service';
import { SignUpViewModal } from '../../models/sign-up-view-modal';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, CanComponentDeactivate {

  signUpForm: FormGroup | any = null;
  genders = ["male", "female"];
  countries: Country[] = [];
  registerError: string| null = null;
  canLeave : Boolean = true;

  constructor(private countryServices: CountriesService,
    private formBuilder: FormBuilder,
    private customValidatorsService: CustomValidatorsService,
    private loginService: LoginService,
    private route: Router) { }
  

  ngOnInit(): void {
   this.countryServices.getCountries().subscribe((response) =>
   {
     this.countries = response;
   })
    this.signUpForm = this.formBuilder.group({
      // as this.formBuilder.control optional in builder
      personName :  this.formBuilder.group({
        firstName : [null, [Validators.required, Validators.minLength(3)]],
      lastName : [null, [Validators.required, Validators.minLength(3)]],
      }),
      email: [null, [Validators.required, Validators.email], [this.customValidatorsService.duplicateEmailValidator()], { updateOn: 'blur' }],
      phoneNumber : [null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      dob : [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      password: [null,[Validators.required ]],
      confirmPassword: [null,[Validators.required ]],//, {updateOn : "blur"} ],
      gender: [null, [Validators.required]],
      countryID : [null, [Validators.required]],
      receiveNewsLetters : [null],
      skills: this.formBuilder.array([])},
      
      {
        validators:[
          this.customValidatorsService.compareValidator("confirmPassword",
          "password")]
      });

    this.signUpForm.valueChanges.subscribe((value:any) =>{
      console.log(value);
     this.canLeave = false;
    });
    /*
    valueChanges observable of SignUpfORM, update the value of canLeave
    if user edit any of the field, canleave will automatically become false
    */
  
  }
  onSubmitClick(){
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);
    if (this.signUpForm.valid) {
      //convert the signupForm as an object of the signUpViewModel
      var signUpViewModel = this.signUpForm.value as  SignUpViewModal;
      this.loginService.register(signUpViewModel).subscribe((response) =>{
        this.canLeave = true; //can navigate to another route after saving form
        this.route.navigate(["/employee","task"]);
      },
      (error: any)=>{
        console.log(error);
        this.registerError = "Unable to submit the details";
      });
    } 
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
    var formGroup = this.formBuilder.group({
      skillName : [null, [Validators.required]],
      skillLevel: [null, [Validators.required]]
    });
    //typecast the result into form array type, 
    //for getting the form array programmatically
    //place them in () and than can access all the methods
    // using push method to add formGroup into Form Array
    //formGroup represent one skill and we are adding that in form array

    (<FormArray>this.signUpForm.get("skills")).push(formGroup)
  }
  onRemoveClick(index: number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);


  }


}
