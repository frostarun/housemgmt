import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SessionStore } from '../shared/constants-provider/session-store';
import { HolderService } from '../shared/holder/holder.service';
import { UserInfo } from '../shared/model/userinfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  uinfo: UserInfo;
  username : any;


  constructor(
    public router: Router,
    public authService: AuthenticationService,
    public holderService: HolderService) { }

  logout() {
    this.authService.logutUser();
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.username = localStorage.getItem(SessionStore.username);
      this.uinfo = this.holderService.userInfo;
    } else {
      this.router.navigate(["/login"])
    }
  }

}
