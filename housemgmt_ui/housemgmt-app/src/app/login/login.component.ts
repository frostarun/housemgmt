import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { EncryptutilService } from '../shared/encryptutil.service';
import { HolderService } from '../shared/holder/holder.service';
import { LoginParam } from '../shared/model/login-param';
import { UserInfo } from '../shared/model/userinfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  @Input() loginParam = new LoginParam("", "");
  
  constructor(
    public authService: AuthenticationService,
    public router:Router,
    public holderService : HolderService) {

  }

  authenticate() {
    this.authService.authenticate(this.loginParam);
  }

  ngOnInit(): void {
    if(this.authService.isUserLoggedIn()){
      this.router.navigate(["/dashboard"]);
    }
  }

}
