import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { LoginParam } from './shared/model/login-param';
import { SessionStore } from './shared/constants-provider/session-store';
import { EncryptutilService } from './shared/encryptutil.service';
import { UserInfo } from './shared/model/userinfo';
import { HolderService } from './shared/holder/holder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(
    public restApi: ApiService, 
    public router: Router,
    public ecryptService : EncryptutilService,
    public holderService : HolderService) { }


  authenticate(loginParam: LoginParam) {
    let encryptData = new LoginParam(loginParam.username, loginParam.password);
    encryptData.password = this.ecryptService.encryptData(encryptData.password);
    this.restApi.authenticateLogin(encryptData).subscribe((data: UserInfo) => {
      this.holderService.userInfo = data;
      if (data.accessToken != null) {
        localStorage.setItem(SessionStore.auth_header, "Bearer " + data.accessToken);
        localStorage.setItem(SessionStore.username, data.username);
        localStorage.setItem(SessionStore.userId, data.id);
        localStorage.setItem(SessionStore.roles, JSON.stringify(data.roles));
        localStorage.setItem(SessionStore.house, JSON.stringify(data.house));
        this.router.navigate(["dashboard"]).then(()=>{
        });
      }
    });
  }

  isUserLoggedIn() {
    let v = localStorage.getItem(SessionStore.auth_header);
    return !(v == null);
  }

  logutUser() {
    localStorage.removeItem(SessionStore.auth_header);
    localStorage.removeItem(SessionStore.username);
    localStorage.removeItem(SessionStore.roles);
    localStorage.removeItem(SessionStore.house);
    this.router.navigate(["/login"]);
  }
}
