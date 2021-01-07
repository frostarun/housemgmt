import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { BillDetailParam } from 'src/app/shared/model/bill-detail-param';
import { BillParam } from 'src/app/shared/model/bill-param';
import { House } from 'src/app/shared/model/house';
import { Message } from 'src/app/shared/model/message';
import { RentParam } from 'src/app/shared/model/rent-param';
import { UnitParam } from 'src/app/shared/model/unit-param';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  rent = new UnitParam("","","")
  maintanence = new UnitParam("","","")
  electricity = new UnitParam("","","")
  unitParams: Array<UnitParam> = [];
  billParam = new BillParam(this.unitParams);
  rentParam = new RentParam("",  this.billParam);
  
  houses: House[];

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

  addRent(){
    this.rent.name="rent";
    this.rent.unit="0";
    this.maintanence.name="maintanence";
    this.maintanence.unit="0";
    this.electricity.name="electricity";
    this.unitParams.push(this.rent);
    this.unitParams.push(this.maintanence);
    this.unitParams.push(this.electricity);
    this.rentParam.bill.bills = this.unitParams;
    this.apiService.postRent(this.rentParam).subscribe((data:Message)=>{
      window.alert(data.message);
      this.router.navigate(["/admin"])
      // window.location.reload();
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin']);
      });
    });
  }

}
