import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {
  //now will be able to pass the value into into error by assiging the property binding in the host eleengt in div tag
  @Input("alertMessage")alertMessage : string;

  constructor(private elementRef :  ElementRef) { }

  ngOnInit(){
    // `` using this bcz HTML code can go multiple line
    this.elementRef.nativeElement.innerHTML = `
      <div class="alert alert-danger fade show" role="alert">
        <span>${this.alertMessage}</span>
      </div>
    `;
    

  }

}
