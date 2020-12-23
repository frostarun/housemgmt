import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { Rent } from 'src/app/shared/model/rent';
import { UserInfo } from 'src/app/shared/model/userinfo';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  userInfo:UserInfo;
  rent : Rent
  history : Rent[];

  constructor(
    public holderService:HolderService ,
    public authService : AuthenticationService,
    public apiService : ApiService) { }

  ngOnInit(): void {
      this.userInfo = this.holderService.userInfo;
      this.apiService.getRentLatest(this.holderService.house.name).subscribe((data:Rent) =>{
        this.rent = data;
      });
      this.apiService.getRentAll(this.holderService.house.name).subscribe(data =>{
        this.history = data;
      });
  }

}
