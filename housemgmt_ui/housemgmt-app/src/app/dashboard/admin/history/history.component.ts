import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { House } from 'src/app/shared/model/house';
import { Rent } from 'src/app/shared/model/rent';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  houses: House[];
  house :string;
  history :Rent[];

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public holderService: HolderService,
    public apiService: ApiService) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.apiService.getHouseAll().subscribe((data: House[]) => {
        this.houses = data;
      });
    } else {
      this.router.navigate(["/login"])
    }
  }

  getHouseRent(){
    this.apiService.getRentAll(this.house).subscribe((data:Rent[]) =>{
      this.history = data;
    })
  }

}
