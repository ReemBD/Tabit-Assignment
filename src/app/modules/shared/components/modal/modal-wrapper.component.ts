import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent {
  @Input() withBackdrop: boolean = true;
  @Output() public clickOutside: EventEmitter<null> = new EventEmitter();

  @ViewChild('modal') elModal: ElementRef;
  
  public constructor() {}

  @HostListener('document:click', ['$event'])
  public onGlobalClick($event: Event): void {
    const isClickOutside = !this.elModal.nativeElement.contains($event.target);
    if (!isClickOutside) return;
    this.clickOutside.emit(null);
  }
}
