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
    const params = new HttpParams();

    if (payload !== undefined) {
      for (const key in payload) {
        if (payload.hasOwnProperty(key)){
          params.set(key, payload[key]);
        }
      }
    }
    return this.http.get<Type>(this.url(tableName, ''), {params});
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

  private url(tableName: string, type: string): string {
    return `${environment.baseUrl}${tableName}/${type}`;
  }
}
