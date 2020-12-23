import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { UserInfo } from '../model/userinfo';


@Injectable({
  providedIn: 'root'
})
export class UserholderService {

  public userInfo : UserInfo;

  subject = new Subject<UserInfo>();
  
  constructor (){
  }
  
  getsubject():Observable<UserInfo>{
    return this.subject.asObservable();
  }
  
  setSubject(userinfo:UserInfo) {
    this.subject.next(userinfo);
  }
}
