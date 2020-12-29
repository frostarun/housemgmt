import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { HolderService } from 'src/app/shared/holder/holder.service';
import { LoginParam } from 'src/app/shared/model/login-param';
import { UserParam } from 'src/app/shared/model/user-param';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { House } from 'src/app/shared/model/house';
import { Message } from 'src/app/shared/model/message';



@Component({
  selector: 'app-reguser',
  templateUrl: './reguser.component.html',
  styleUrls: ['./reguser.component.scss']
})
export class ReguserComponent implements OnInit {
  hide = true;
  roleCtrl = new FormControl();
  houseControl = new FormControl('', Validators.required);
  roles: string[] = ['mod', 'admin', 'user'];
  @Input() userParam = new UserParam("", "", "", this.roles);
  houses: House[];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRoles: Observable<string[]>;
  allRoles: string[] = ['mod', 'admin', 'user'];

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public holderService: HolderService,
    public apiService: ApiService) {
    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filter(role) : this.allRoles.slice()));

  }

  register() {
    this.authService.registerUser(this.userParam);
  }

  deleteUser(){
    this.apiService.deleteUser(this.userParam.username).subscribe((data:Message)=>{
      window.alert(data.message);
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.apiService.getHouseAll().subscribe((data: House[]) => {
        this.houses = data;
      });
    } else {
      this.router.navigate(["/login"])
    }

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.roles.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.roleCtrl.setValue(null);
  }

  remove(role: string): void {
    const index = this.roles.indexOf(role);

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.viewValue);
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRoles.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
