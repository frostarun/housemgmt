import { ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { DateutilService } from 'src/app/shared/dateutil.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { Rent } from 'src/app/shared/model/rent';

@Component({
  selector: 'app-tab-history',
  templateUrl: './tab-history.component.html',
  styleUrls: ['./tab-history.component.scss'],
})
export class TabHistoryComponent implements OnInit {
  history: Rent[];
  cardTitle : string;
  cardDesc : string;
  @Input() houseName : string;

  constructor(
    public holderService: HolderService,
    public authService: AuthenticationService,
    public apiService: ApiService,
    public router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      if(!this.houseName){
        this.houseName = this.holderService.house.name;
      }
      this.apiService.getRentAll(this.houseName).subscribe(data => {
        this.history = data;
      });
    } else {
      this.router.navigate(["/login"])
    }
  }

  getCardTitle(date :string){
    var rentDate = new Date(date);
    var rentDay = rentDate.getDate().toString();
    var rentYear = rentDate.getUTCFullYear().toString();
    var rentMonthName = DateutilService.getShortMonthName(rentDate);
    this.cardTitle =  rentMonthName+' , '+rentYear;
  }

  getCardDesc(date :string){
    var rentDate = new Date(date);
    var rentDay = rentDate.getUTCDate().toString();
    var rentYear = rentDate.getUTCFullYear().toString();
    var rentMonth = DateutilService.getMonthNumber(rentDate);
    this.cardDesc =  rentDay+'-'+rentMonth+'-'+rentYear;
  }

}
