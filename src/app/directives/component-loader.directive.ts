import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appComponentLoader]'
})
export class ComponentLoaderDirective {

  //will access viewContainerRef this in master component
  constructor(public viewContainerRef : ViewContainerRef ) { }

}
