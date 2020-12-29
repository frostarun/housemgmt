import { Directive, Injectable, OnInit } from '@angular/core';
import { SessionStore } from '../constants-provider/session-store';
import { House } from '../model/house';
import { UserInfo } from '../model/userinfo';

@Injectable({
  providedIn: "root"
})
export class HolderService {

  public username = localStorage.getItem(SessionStore.username);;
  public userId: any;
  public house: House = JSON.parse(localStorage.getItem(SessionStore.house) || '{}');;
  public roles: string[];


  constructor() {
    this.username = localStorage.getItem(SessionStore.username);
    this.userId = localStorage.getItem(SessionStore.userId);
    this.house = JSON.parse(localStorage.getItem(SessionStore.house) || '{}');
    this.roles = JSON.parse(localStorage.getItem(SessionStore.roles) || '{}');
  }

  refreshData(){
    this.username = localStorage.getItem(SessionStore.username);
    this.userId = localStorage.getItem(SessionStore.userId);
    this.house = JSON.parse(localStorage.getItem(SessionStore.house) || '{}');
    this.roles = JSON.parse(localStorage.getItem(SessionStore.roles) || '{}');
  }

}
