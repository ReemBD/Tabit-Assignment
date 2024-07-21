import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User, UserId } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() showUserDetails: EventEmitter<UserId> = new EventEmitter();

  public constructor() {}

  public onShowUserDetails($event: UserId): void {
    this.showUserDetails.emit($event);
  }
}
