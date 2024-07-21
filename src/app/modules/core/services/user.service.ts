import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  public constructor(
    private readonly http: HttpService,
    private readonly logger: LoggerService
  ) {}

  public fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_PATH).pipe(
      catchError(this.handleError<User[]>('fetchUsers', [])),
      tap((users: User[]) => this.usersSubject.next(users))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
