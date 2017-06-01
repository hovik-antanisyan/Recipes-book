import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    // dropdownClass: string = 'open';
    @HostBinding('class.open') isOpen = false;

    constructor(private renderer: Renderer2, private elRef: ElementRef) {
    }

    /*@HostListener('click') onClick() {
     this.elRef.nativeElement.classList.toggle('open');
     }*/

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}
