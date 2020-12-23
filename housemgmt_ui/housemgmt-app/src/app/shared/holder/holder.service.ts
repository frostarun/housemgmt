import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { SessionStore } from '../constants-provider/session-store';
import { House } from '../model/house';
import { UserInfo } from '../model/userinfo';

@Injectable({
  providedIn: "root"
})
export class HolderService {

  public userInfo : UserInfo;
  public username : any;
  public userId : any;
  public house : House;
  public roles : string[];
  
  constructor() { 
    this.username = localStorage.getItem(SessionStore.username);
    this.userId = localStorage.getItem(SessionStore.userId);
    this.house = JSON.parse(localStorage.getItem(SessionStore.house) || '{}');
    this.roles = JSON.parse(localStorage.getItem(SessionStore.roles) || '{}');
  }

}
