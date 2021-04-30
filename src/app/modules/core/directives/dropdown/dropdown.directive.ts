import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isOpen = false;

  @HostListener('document:click', ['$event']) toggle(event: Event) {
    const target = this.element.nativeElement.children[1];
    this.isOpen = this.element.nativeElement.contains(event.target) ? !this.isOpen : false;
    if (this.isOpen) {
      this.rendered.addClass(target, 'show');
    } else {
      this.rendered.removeClass(target, 'show');
    }
  }

  constructor(private element: ElementRef, private rendered: Renderer2) { }


}
