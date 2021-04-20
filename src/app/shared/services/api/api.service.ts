import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    let url = `${environment.baseUrl}${tableName}/${type}`;
    if (type.length === 0) {
      // This Removes trailing Forward Slash
      url = url.substring(0, url.length - 1);
    }
    return url;
  }
}
