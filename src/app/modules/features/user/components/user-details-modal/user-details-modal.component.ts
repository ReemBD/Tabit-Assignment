import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrl: './user-details-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsModalComponent {
  @Input() user: User;
  @Output() closeUserDetails: EventEmitter<null> = new EventEmitter();

  public constructor(private elementRef: ElementRef) {}

  // TODO: Refactor to generic modal component
  @HostListener('document:click', ['$event'])
  public onGlobalClick($event: Event): void {
    const isClickOutside = !this.elementRef.nativeElement.contains($event.target);
    if (!isClickOutside) return;
    this.closeUserDetails.emit(null);
  }
}
