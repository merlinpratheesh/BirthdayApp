import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdetailsRoutingModule } from './memberdetails-routing.module';
import { MemberdetailsComponent } from './memberdetails.component';
import { CenterContentComponent } from './center-content/center-content.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MemberMainComponent } from './member-main/member-main.component';
import { RightSidenavContentComponent } from './right-sidenav-content/right-sidenav-content.component';
import { AppSharedModule } from 'src/app/app-shared/app-shared.module';


@NgModule({
  declarations: [
    MemberdetailsComponent,
    CenterContentComponent,
    CustomerDashboardComponent,
    MemberMainComponent,
    RightSidenavContentComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    MemberdetailsRoutingModule
  ]
})
export class MemberdetailsModule { }
