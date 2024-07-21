import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserId } from '../../models/user.model';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.scss',
})
export class UserPreviewComponent {
  @Input() public user: User;
  @Output() public showDetails: EventEmitter<UserId> = new EventEmitter();

  public constructor() {}

  public onShowDetails($event: UserId): void {
    this.showDetails.emit($event);
  }
}
