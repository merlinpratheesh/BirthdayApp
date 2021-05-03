import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { LeftSidenavContentComponent } from './left-sidenav-content/left-sidenav-content.component';
import { RightSidenavContentComponent } from './right-sidenav-content/right-sidenav-content.component';
import { CenterContentComponent } from './center-content/center-content.component';
import { AppSharedModule } from '../app-shared/app-shared.module';



@NgModule({
  declarations: [
    CustomersComponent,
    CenterContentComponent,
    RightSidenavContentComponent,
    LeftSidenavContentComponent
  ],
  imports: [

    CommonModule,
    AppSharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
