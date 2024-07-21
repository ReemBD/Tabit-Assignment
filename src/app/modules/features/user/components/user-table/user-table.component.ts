import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { User, UserId } from '../../models/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Output() showUserDetails: EventEmitter<UserId> = new EventEmitter();

  public readonly displayedColumns: Partial<keyof User>[] = ['name', 'email', 'phone', 'website'];

  public constructor() {}

  public onShowUserDetails($event: UserId): void {
    this.showUserDetails.emit($event);
  }
}
