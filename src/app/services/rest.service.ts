import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    public http: HttpClient
  ) {

    }

  private getUrlReturn(url:string): Observable<string[]> {
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res) {
    let body = res.json();
    return JSON.parse(body)  || {};
  }

  private handleError(error) {
    let errMsg: string;
    if(error instanceof Response) {
      const body = error.json() || '';
      const err = body['error'] || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`; 
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
} 
