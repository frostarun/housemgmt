import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateutilService {

  static monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  static monthNumber = ["01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"];

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

  public static getMonthNumber(date: Date): string {
    return this.monthNumber[date.getMonth()];
  }

  

}
