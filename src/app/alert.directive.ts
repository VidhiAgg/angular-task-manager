import { Directive, ElementRef, HostBinding, HostListener, Input,
  Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {
  //now will be able to pass the value into into error by assiging the property binding in the host eleengt in div tag
  @Input("alertMessage")alertMessage : string;
  @HostBinding("title")title : string;

  constructor(private elementRef :  ElementRef,
    private render2 : Renderer2) { }

    divElement : any;
    spanElement: any;
    spanText: any;

  ngOnInit(){
    // `` using this bcz HTML code can go multiple line
    /*this.elementRef.nativeElement.innerHTML = `
      <div class="alert alert-danger fade show" role="alert" style ="transition:transform 0.5s">
        <span>${this.alertMessage}</span>
      </div>
    `;*/
    //using rendere2 
    this.divElement = this.render2.createElement("div"); //<div></div>
    this.render2.setAttribute(this.divElement,"role","alret"); //<div role="alret"></div>
    this.render2.setAttribute(this.divElement,"class","alert alert-danger fade show"); 
    //<div role="alret" class="alert alert-danger fade show"></div>
    this.render2.setAttribute(this.divElement,"transition","transform 0.5s");
        //<div role="alret" class="alert alert-danger fade show" style ="transition:transform 0.5s"></div>
  this.spanElement = this.render2.createElement("span");
  this.render2.setAttribute(this.spanElement,"class","message");
  //<span class="message">
  this.spanText = this.render2.createText(this.alertMessage);
  this.render2.appendChild(this.spanElement, this.spanText);
    //<span class="message">${this.error}</span>
    this.render2.appendChild(this.divElement,this.spanElement);

    /*<div class="alert alert-danger fade show" role="alert" style ="transition:transform 0.5s">
        <span>${this.alertMessage}</span>
      </div>*/
      this.elementRef.nativeElement.appendChild(this.divElement);

    this.title="Either username or password is incorrect.";
  }
  //method binded to mouseenter event of hostListner
  // event paramaetr represents th event parameter of JS DOM.
  //querySelector -> can search for the children by using it.
  @HostListener("mouseenter", ["$event"])
  onMouseEnter(event: any) {
   // this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1.1)";
   this.render2.setStyle(this.divElement,"transform", "scale(1.1");

  }

  @HostListener("mouseleave", ["$event"])
  onMouseLeave() {
   // this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1)";
   this.render2.setStyle(this.divElement,"transform", "scale(1)");
  }

  }


