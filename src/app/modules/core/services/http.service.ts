import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public constructor(private readonly httpClient: HttpClient) { }

  public get<T>(path: string, queryParams?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiUrl}${path}`, { params: queryParams, responseType: 'json' });
  }

  public post<T>(path: string, args: unknown): Observable<T> {
    return this.httpClient.post<T>(`${environment.apiUrl}${path}`, args, { responseType: 'json' });
  }
}
