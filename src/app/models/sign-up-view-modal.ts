export class SignUpViewModal {
    personName:  any = null;   
    email:string| any = null;
    phoneNumber :number|any = null;
    dob :string|any = null;
    password: string|any = null;
    confirmPassword: string|any = null;
    gender: string|any = null;
    countryID : number|any = null;
    receiveNewsLetters :boolean |any = null; 
    skills: any = null;

    //intializing all prop. using constrctor
    constructor(

    personName:  any = null,   
      email:string| any = null,
      phoneNumber :number|any = null,
      dob :string|any = null,
      password: string|any = null,
      confirmPassword: string|any = null,
      gender: string|any = null,
      countryID : number|any = null,
      receiveNewsLetters :boolean |any = null, 
      skills: any = null )
      {
    
          this.personName = personName;
          this.email = email;
          this.dob = dob;
          this.password = password;
          this.confirmPassword = confirmPassword;
          this.phoneNumber = phoneNumber;
          this.gender = gender;
          this.countryID = countryID;
          this.receiveNewsLetters = receiveNewsLetters;
          this.skills = skills;

      }
}
