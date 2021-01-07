import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { House } from 'src/app/shared/model/house';
import { HouseParam } from 'src/app/shared/model/house-param';
import { Message } from 'src/app/shared/model/message';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {

  @Input() house = new HouseParam("");

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

  createHouse() {
    this.apiService.createHouse(this.house).subscribe((data: Message) => {
      window.alert(data.message);
      this.apiService.getHouseAll().subscribe((data: House[]) => {
        this.houses = data;
      });
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin']);
      });
    })
  }

  deleteHouse() {
    this.apiService.deleteHouse(this.house.name).subscribe((data: Message) => {
      window.alert(data.message);
      this.apiService.getHouseAll().subscribe((data: House[]) => {
        this.houses = data;
      });
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin']);
      });
    })
  }

  deleteRentForHouse(housename: string) {
    this.apiService.deleteRentAll(housename).subscribe((data: Message) => {
      window.alert(data.message);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin']);
      });
      // window.location.reload();
    })
  }
}
