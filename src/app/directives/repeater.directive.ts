import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeater]'
})
export class RepeaterDirective {
  @Input("appRepeater")n:number;
  // viewContainRef-> represents the reference of child-view
  //templateRef -> represents the reference of ng-template
  constructor(private viewContainRef: ViewContainerRef,
    private templateRef: TemplateRef<any>) { 
      this.viewContainRef.clear(); //clearing the default created view and creating a user defined embedded view

    }
    ngOnInit(){
      for (let index = 0; index < this.n; index++) {
       this.viewContainRef.createEmbeddedView(this.templateRef,{$implicit:index});
        
      }
    }

}
