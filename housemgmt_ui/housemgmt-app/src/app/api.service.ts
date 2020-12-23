import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { LoginParam } from './shared/model/login-param';
import { UserInfo } from './shared/model/userinfo';
import { Rent } from './shared/model/rent';
import { SessionStore } from './shared/constants-provider/session-store';

@Injectable({
  providedIn: 'root'
})



export class ApiService {

  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };



  authenticateLogin(loginParam: LoginParam) {
    return this.http
      .post<UserInfo>(this.apiURL + "/user/auth", JSON.stringify(loginParam), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getRentLatest(house: string) {
    console.log("http options : ", this.httpOptions)
    return this.http
      .get<Rent>(this.apiURL + "/rent/" + house + "/latest", this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getRentAll(house: string) {
    console.log("http options : ", this.httpOptions)
    return this.http
      .get<Rent[]>(this.apiURL + "/rent/" + house , this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = "";
    console.log("error : ", error)
    console.log("error : ", error.error.message)
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Occured : ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
