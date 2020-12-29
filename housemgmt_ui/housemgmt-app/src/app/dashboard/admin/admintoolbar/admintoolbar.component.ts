import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { SessionStore } from 'src/app/shared/constants-provider/session-store';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { House } from 'src/app/shared/model/house';


@Component({
  selector: 'app-admintoolbar',
  templateUrl: './admintoolbar.component.html',
  styleUrls: ['./admintoolbar.component.scss']
})
export class AdmintoolbarComponent implements OnInit {

  username: any;
  house: House;


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
      this.house = JSON.parse(localStorage.getItem(SessionStore.house) || '{}');
    } else {
      this.router.navigate(["/login"])
    }
  }

  goToDash(){
    this.router.navigate(["/dashboard"])
  }
}
