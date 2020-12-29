import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { DateutilService } from 'src/app/shared/dateutil.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { Rent } from 'src/app/shared/model/rent';

@Component({
  selector: 'app-tab-latest',
  templateUrl: './tab-latest.component.html',
  styleUrls: ['./tab-latest.component.scss']
})
export class TabLatestComponent implements OnInit {
  rent: Rent
  rentDate: any;
  rentMonthName: string;
  rentMonth: any;
  rentDay: any;
  rentYear: string;
  rentTotal: string;
  map = new Map<String, String>();


  constructor(
    public holderService: HolderService,
    public authService: AuthenticationService,
    public apiService: ApiService,
    public router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.apiService.getRentLatest(this.holderService.house.name).subscribe((data: Rent) => {
        this.rent = data;
        var a = new Date(this.rent.date);
        this.rentDate = new Date(this.rent.date);
        this.rentMonthName = DateutilService.getMonthName(this.rentDate);
        this.rentYear = this.rentDate.getUTCFullYear().toString();
        this.rentMonth = DateutilService.getMonthNumber(this.rentDate);
        this.rentDay = this.rentDate.getUTCDate().toString();
        this.rentTotal = this.rent.bill.total; 
      });
    } else {
      this.router.navigate(["/login"])
    }
  }

  jsonToMap(jsonStr: string) {
    return new Map(JSON.parse(jsonStr));
  }
}
