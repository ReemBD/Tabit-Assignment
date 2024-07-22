import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '@features/user/models/user.model';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrl: './user-details-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsModalComponent {
  @ViewChild('modal') modalRef: ElementRef;
  @Input() user: User;
  @Output() closeUserDetails: EventEmitter<null> = new EventEmitter();

  public constructor() {}

  @HostListener('document:click', ['$event'])
  public onGlobalClick($event: Event): void {
    const isClickOutside = !this.modalRef.nativeElement.contains($event.target);
    if (!isClickOutside) return;
    this.closeUserDetails.emit();
  }
}
