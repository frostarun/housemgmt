import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { DateutilService } from 'src/app/shared/dateutil.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { Rent } from 'src/app/shared/model/rent';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }

}
