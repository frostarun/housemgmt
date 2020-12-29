import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TabsComponent } from './dashboard/tabs/tabs.component';
import { TokenInterceptor } from './token-interceptor';
import { HolderService } from './shared/holder/holder.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TabLatestComponent } from './dashboard/tabs/tab-latest/tab-latest.component';
import { TabHistoryComponent } from './dashboard/tabs/tab-history/tab-history.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ReguserComponent } from './dashboard/admin/reguser/reguser.component';
import { RentComponent } from './dashboard/admin/rent/rent.component';
import { AdmintoolbarComponent } from './dashboard/admin/admintoolbar/admintoolbar.component';
import { HouseComponent } from './dashboard/admin/house/house.component';
import { HistoryComponent } from './dashboard/admin/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PagenotfoundComponent,
    TabsComponent,
    ToolbarComponent,
    TabLatestComponent,
    TabHistoryComponent,
    AdminComponent,
    ReguserComponent,
    RentComponent,
    AdmintoolbarComponent,
    HouseComponent,
    HistoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },HolderService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
