import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, filter } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseAPi = environment.baseApi;
  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";


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
    let body = res;
    return JSON.parse(body)  || {};
  }

  private handleError(error) {
    let errMsg: string;
    if(error !== undefined) {
      const body = error || '';
      const err = body['error'] || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`; 
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }

  public login(mobile, password) {
    return this.getUrlReturn(`${this.apiUrlLogin}?mobile=${mobile}&password=${password}`);
  }

  public register(mobile, nickname, password) {
    return this.getUrlReturn(`${this.apiUrlRegister}?mobile=${mobile}&password=${password}&nickname=${nickname}`);
  }
} 
