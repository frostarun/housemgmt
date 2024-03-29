
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { SessionStore } from 'src/app/shared/constants-provider/session-store';
import { HolderService } from 'src/app/shared/holder/holder.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username: any;
  roles: string[];

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
      this.roles = JSON.parse(localStorage.getItem(SessionStore.roles) || '{}');
      if (this.roles.includes('ROLE_ADMIN')) {

      } else {
        this.router.navigate(["/dashboard"])
      }
    } else {
      this.router.navigate(["/login"])
    }
  }
}
