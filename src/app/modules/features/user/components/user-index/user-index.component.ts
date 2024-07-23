import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { catchError, map, takeUntil, tap, throwError } from 'rxjs';

import { LoggerService } from '@core/services/logger.service';
import { UserService } from '@core/services/user.service';
import { User, UserId } from '@features/user/models/user.model';
import { DestroyCleanupSubject } from '@core/helpers/destroy-cleanup-subject.helper';
import { SupportedSortingColumns } from '@features/user/models/user-sort.model';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.scss',
})
export class UserIndexComponent implements OnInit, OnDestroy {
  private readonly cleanupStream = new DestroyCleanupSubject();

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
  private get defaultSort(): Sort {
    return { direction: 'asc', active: 'name' };
  }

  public constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService
  ) {}

  public ngOnInit(): void {
    this.fetchUsers();
    this.subscribeUsers();
  }

  public ngOnDestroy(): void {
    this.cleanupStream.cleanup();
  }

  public onToggleUserDetails($event: UserId): void {
    this.shownUser = this.displayedUsers.find((user) => user.id === $event);
  }

  public onSortUsers($event: Sort): void {
    this.sort = $event;
  }

  private subscribeUsers(): void {
    this.userService.users$
      .pipe(takeUntil(this.cleanupStream))
      .subscribe((users) => (this.displayedUsers = users));
  }

  private fetchUsers(): void {
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
  }

  private sortUsers(users: User[]): User[] {
    const active = this.sort.active as SupportedSortingColumns;
    return users.sort((u1, u2) =>
      this.sort.direction === 'asc'
        ? u1[active].localeCompare(u2[active])
        : u2[active].localeCompare(u1[active])
    );
  }
}
