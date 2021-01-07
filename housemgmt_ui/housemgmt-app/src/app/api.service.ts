import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { LoginParam } from './shared/model/login-param';
import { UserInfo } from './shared/model/userinfo';
import { Rent } from './shared/model/rent';
import { SessionStore } from './shared/constants-provider/session-store';
import { Router } from '@angular/router';
import { UserParam } from './shared/model/user-param';
import { Message } from './shared/model/message';
import { House } from './shared/model/house';
import { HouseParam } from './shared/model/house-param';
import { RentParam } from './shared/model/rent-param';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})



export class ApiService {

  apiURL = environment.apiUrl;

  constructor(private http: HttpClient, public router: Router) { }

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

  registerUser(userParam: UserParam) {
    return this.http
      .post<Message>(this.apiURL + "/user", JSON.stringify(userParam), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteUser(username: string) {
    return this.http
      .delete<Message>(this.apiURL + "/user/" + username, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getRentLatest(house: string) {
    return this.http
      .get<Rent>(this.apiURL + "/rent/" + house + "/latest", this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  getRentAll(house: string) {
    return this.http
      .get<Rent[]>(this.apiURL + "/rent/" + house, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  deleteRentAll(house: string) {
    return this.http
      .delete<Message>(this.apiURL + "/rent/" + house, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postRent(rent :RentParam){
    return this.http
      .post<Message>(this.apiURL + "/rent", JSON.stringify(rent), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  getHouseAll() {
    return this.http
      .get<House[]>(this.apiURL + "/house", this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  createHouse(house: HouseParam) {
    return this.http
      .post<Message>(this.apiURL + "/house", JSON.stringify(house), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteHouse(house: string) {
    return this.http
      .delete<Message>(this.apiURL + "/house/" + house, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }



  // Error handling
  handleError(error: any) {
    let errorMessage = error.error.message || '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error instanceof HttpErrorResponse) {
      var err = error as HttpErrorResponse;
      if (err.status == 401 || err.status == 0) {
        localStorage.removeItem(SessionStore.auth_header);
        localStorage.removeItem(SessionStore.username);
        localStorage.removeItem(SessionStore.roles);
        localStorage.removeItem(SessionStore.house);
        localStorage.removeItem(SessionStore.userId);
        this.router.navigate(["/login"]);
      }
      if (err.status == 403 || err.status == 0) {
        errorMessage = 'You dont have admin rights';
      }
    } else {
      errorMessage = `Error Occured : ${error.error.message}` + 'Please report to House owner';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
