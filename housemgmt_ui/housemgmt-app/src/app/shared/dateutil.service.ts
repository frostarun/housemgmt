import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateutilService {

  static monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  static shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  constructor() { }

  public static getMonthName(date: Date): string {
    return this.monthNames[date.getMonth()];
  }

  public static getShortMonthName(date: Date): string {
    return this.shortMonthNames[date.getMonth()];
  }

}
