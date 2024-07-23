import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public constructor(private readonly httpClient: HttpClient) {}

  public get<T>(path: string, queryParams?: HttpParams): Observable<T> {
    path = `${environment.API_URL}${path}`;
    return this.httpClient.get<T>(path, { params: queryParams, responseType: 'json' });
  }

  public post<T>(path: string, args: unknown): Observable<T> {
    path = `${environment.API_URL}${path}`;
    return this.httpClient.post<T>(path, args, { responseType: 'json' });
  }

  public patch<T>(path: string, args: unknown): Observable<T> {
    path = `${environment.API_URL}${path}`;
    return this.httpClient.patch<T>(path, args, { responseType: 'json' });
  }
}
