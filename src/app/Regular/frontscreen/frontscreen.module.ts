import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontscreenRoutingModule } from './frontscreen-routing.module';
import { FrontscreenComponent } from './frontscreen.component';
import { LeftSidenavContentComponent } from './left-sidenav-content/left-sidenav-content.component';
import { RightSidenavContentComponent } from './right-sidenav-content/right-sidenav-content.component';
import { CenterContentComponent } from './center-content/center-content.component';
import { AppSharedModule } from 'src/app/app-shared/app-shared.module';

@NgModule({
  declarations: [
    FrontscreenComponent,
    LeftSidenavContentComponent,
    RightSidenavContentComponent,
    CenterContentComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    FrontscreenRoutingModule
  ]
})
export class FrontscreenModule { }
