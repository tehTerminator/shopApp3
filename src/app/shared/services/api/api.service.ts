import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  select<Type>(tableName: string, payload?: {[key: string]: string}): Observable<Type>{
    return this.http.get<Type>(this.url(tableName), {params: payload});
  }

  create<Type>(tableName: string, payload: {[key: string]: any}): Observable<Type>{
    return this.http.put<Type>(this.url(tableName, 'create'), payload);
  }

  update<Type>(tableName: string, payload: {[key: string]: any}): Observable<Type> {
    return this.http.post<Type>(this.url(tableName, 'update'), payload);
  }

  delete<Type>(tableName: string, id: number): Observable<Type> {
    return this.http.delete<Type>(`${this.url(tableName, 'delete')}/${id}`);
  }

  private url(tableName: string, type = ''): string {
    let url = `${environment.baseUrl}/${tableName}/${type}`;
    if (type.length === 0) {
      // This Removes trailing Forward Slash
      url = url.substring(0, url.length - 1);
    }
    return url;
  }


  get <Type>(url: string[], payload?: { [key: string]: string | number | boolean }, method = 'GET'): Observable<Type> {
    const serverUrl = this.createUrl('get', url);
    let request: any = null;
    if (method === 'POST') {
      request = this.http.post<Type>(serverUrl, payload);
    } else {
      request = this.http.get<Type>(serverUrl, { params: payload });
    }

    return request.pipe(
      catchError(error => this.handleError(error))
    );
  }

  insert<Type>(url: string[], payload: { [key: string]: any }): Observable<Type> {
    const serverUrl = this.createUrl('create', url);
    return this.http.post<Type>(serverUrl, payload);
  }

  revise<Type>(url: string[], payload: { [key: string]: any }): Observable<Type> {
    const serverUrl = this.createUrl('update', url);
    return this.http.put<Type>(serverUrl, payload);
  }

  remove(url: string[]): Observable<GeneralReponse> {
    const serverUrl = this.createUrl('delete', url);
    return this.http.delete<GeneralReponse>(serverUrl);
  }

  private createUrl(prefix: string, url: string[]): string {
    const trail = [prefix, ...url].join('/');
    return `${environment.baseUrl}/${trail}`;
  }

  private handleError(error: any): ObservableInput<any> {
    console.error(error);
    if (typeof (error.error) === 'string') {
      throw new Error(error.error);
    }
    throw new Error('Unable to Create New Request');
  }
}

export interface GeneralReponse {
  message: string;
}

