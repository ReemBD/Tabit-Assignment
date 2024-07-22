import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { catchError, map, throwError } from 'rxjs';

import { LoggerService } from '@core/services/logger.service';
import { UserService } from '@core/services/user.service';
import { User, UserId } from '@features/user/models/user.model';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.scss',
})
export class UserIndexComponent implements OnInit {
  public isFetching: boolean;
  public error: Error;
  public displayedUsers: User[];
  public shownUser: User;

  private _sort: Sort = this.defaultSort;
  public set sort(value: Sort) {
    this._sort = value;
    this.displayedUsers = this.sortUsers([...this.displayedUsers]);
  }
  public get sort(): Sort {
    return this._sort;
  }

  public constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService
  ) {}

  public ngOnInit(): void {
    this.isFetching = true;
    this.userService
      .fetchUsers()
      .pipe(
        map((users) => this.sortUsers(users)),
        catchError((err) =>
          throwError(() => {
            this.logger.error('something went wrong while trying to display users ', err);
            throw new Error('Something went wrong while fetching users, please try again later');
          })
        )
      )
      .subscribe({
        error: (error) => {
          this.error = error;
        },
        complete: () => {
          this.isFetching = false;
        },
      });
    this.userService.users$.subscribe((users) => (this.displayedUsers = users));
  }

  public onToggleUserDetails($event: UserId): void {
    this.shownUser = this.displayedUsers.find((user) => user.id === $event);
  }

  public onSortUsers($event: Sort): void {
    this.sort = $event;
  }

  private sortUsers(users: User[]): User[] {
    const active = this.sort.active as 'email' | 'name';
    return users.sort((u1, u2) =>
      this.sort.direction === 'asc'
        ? u1[active].localeCompare(u2[active])
        : u2[active].localeCompare(u1[active])
    );
  }

  private get defaultSort(): Sort {
    return { direction: 'asc', active: 'name' };
  }
}
