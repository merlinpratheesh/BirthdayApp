import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMapDetailsRoutingModule } from './my-map-details-routing.module';
import { MyMapDetailsComponent } from './my-map-details.component';
import { CenterContentComponent } from './center-content/center-content.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MapMainComponent } from './map-main/map-main.component';
import { RightSidenavContentComponent } from './right-sidenav-content/right-sidenav-content.component';
import { AppSharedModule } from 'src/app/app-shared/app-shared.module';


@NgModule({
  declarations: [
    MyMapDetailsComponent,
    CenterContentComponent,
    CustomerDashboardComponent,
    MapMainComponent,
    RightSidenavContentComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    MyMapDetailsRoutingModule
  ]
})
export class MyMapDetailsModule { }
