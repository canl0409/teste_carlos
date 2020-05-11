import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  getDev(id): Observable<any> {
    return this.http.get(endpoint + 'dev/' + id).pipe(map(this.extractData));
  }
  addDev(dev): Observable<any> {
    console.log(dev);
    return this.http
      .post<any>(endpoint + 'dev', JSON.stringify(dev), httpOptions)
      .pipe(
        tap((product) => console.log(`add dev w/ id=${product.id}`)),
        catchError(this.handleError<any>('addProduct'))
      );
  }
  updateDev(id, dev): Observable<any> {
    return this.http
      .put(endpoint + 'dev/' + id, JSON.stringify(dev), httpOptions)
      .pipe(
        tap((_) => console.log(`updated dev id=${id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }
}

const endpoint = 'http://localhost:4200/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
