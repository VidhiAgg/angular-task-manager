export class Country {
    countryID: number|any;
    countryName: string;
    //will execute on creating new object of class
    constructor(countryIDParam: number,
        countryNameParam: string)
        {
            this.countryID = countryIDParam;
            this.countryName = countryNameParam;
    }
}
