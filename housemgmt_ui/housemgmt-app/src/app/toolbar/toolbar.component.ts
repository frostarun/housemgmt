import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SessionStore } from '../shared/constants-provider/session-store';
import { HolderService } from '../shared/holder/holder.service';
import { House } from '../shared/model/house';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  username: any;
  house: House;
  roles: string[];
  isAdmin: boolean = false;


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
      this.checkIfAdmin();
    } else {
      this.router.navigate(["/login"])
    }
  }

  checkIfAdmin() {
    this.roles = JSON.parse(localStorage.getItem(SessionStore.roles) || '{}');
    if (this.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
  }

  goToAdmin(){
    this.router.navigate(["/admin"])
  }

}
