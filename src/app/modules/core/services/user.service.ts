import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
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

  public updateUser(uid: string, changes: Partial<User>) {
    return this.users$.pipe(
      take(1),
      map((users: User[]) => {
        const oldUser = users.find((user) => user.id === uid);
        const updatedUser: User = { ...oldUser, ...changes };
        const updatedUsers: User[] = users.map((user) => (user.id === uid ? updatedUser : user));

        this.usersSubject.next(updatedUsers);
        return updatedUser;
      })
    );
  }
  private handleError<T>(operation = 'operation') {
    return (error: Error): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error('Failed to fetch users'));
    };
  }
}
