import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { User } from 'app/modules/features/user/models/user.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_PATH: string = '/users';

  private readonly usersSubject = new BehaviorSubject<User[]>(null);
  public readonly users$ = this.usersSubject.asObservable();

  public constructor(private readonly http: HttpService, private readonly logger: LoggerService) {}

  public fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_PATH).pipe(
      catchError(this.handleError<User[]>('fetchUsers')),
      tap((users: User[]) => this.usersSubject.next(users))
    );
  }

  public updateUser(userId: string, changes: Partial<User>) {
    return this.http.patch<User>(`${this.BASE_PATH}/${userId}`, JSON.stringify(changes)).pipe(
      tap((updatedUser: User) => {
        this.updateUsersSubject((users: User[]) => {
          // ! API Doesnt actually work, so update manually
          return users.map((user) => (user.id === userId ? { ...updatedUser, ...changes } : user));
        });
      }),
      catchError(this.handleError<User>('updateUser'))
    );
  }
  private handleError<T>(operation = 'operation') {
    return (error: Error): Observable<T> => {
      const message = `${operation} failed: ${error.message}`;
      this.logger.error(message);
      return throwError(() => new Error(message));
    };
  }

  private updateUsersSubject(updateFn: (users: User[]) => User[]): void {
    this.usersSubject.pipe(take(1)).subscribe((users) => {
      const newUsers = updateFn(users);
      this.usersSubject.next(newUsers);
    });
  }
}
