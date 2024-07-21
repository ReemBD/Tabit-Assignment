import { Component } from '@angular/core';
import { UserService } from 'app/modules/core/services/user.service';
import { map, Observable, of } from 'rxjs';
import { User, UserId } from '../../models/user.model';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.scss',
})
export class UserIndexComponent {
  public users$: Observable<User[]>;
  public userShown$: Observable<User | null> = of(null);

  public constructor(private readonly userService: UserService) {}

  public ngOnInit(): void {
    this.users$ = this.userService.fetchUsers();
  }

  public onToggleUserDetails($event: UserId) {
    this.userShown$ = this.users$.pipe(map((users) => users.find((user) => user.id === $event)));
  }
}
