import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {
  //now will be able to pass the value into into error by assiging the property binding in the host eleengt in div tag
  @Input("alertMessage")alertMessage : string;
  @HostBinding("title")title : string;

  constructor(private elementRef :  ElementRef) { }

  ngOnInit(){
    // `` using this bcz HTML code can go multiple line
    this.elementRef.nativeElement.innerHTML = `
      <div class="alert alert-danger fade show" role="alert" style ="transition:transform 0.5s">
        <span>${this.alertMessage}</span>
      </div>
    `;
    this.title="Either username or password is incorrect.";
  }
  //method binded to mouseenter event of hostListner
  // event paramaetr represents th event parameter of JS DOM.
  //querySelector -> can search for the children by using it.
  @HostListener("mouseenter", ["$event"])
  onMouseEnter(event: any) {
    this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1.1)";
  }

  @HostListener("mouseleave", ["$event"])
  onMouseLeave() {
    this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1)";
  }

  }


