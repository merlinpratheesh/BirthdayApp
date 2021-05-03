import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSharedModule } from './app-shared/app-shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { ListOfModulesComponent } from './list-of-modules/list-of-modules.component';
import { AuthComponent } from './Regular/auth/auth.component';
import { OnlineComponent } from './Regular/online/online.component';
import { LeftSidenavContentComponent } from './Regular/frontscreen/left-sidenav-content/left-sidenav-content.component';
import { RightSidenavContentComponent } from './Regular/frontscreen/right-sidenav-content/right-sidenav-content.component';
import { CenterContentComponent } from './Regular/frontscreen/center-content/center-content.component';




@NgModule({
  declarations: [
    AppComponent,
    ListOfModulesComponent,
    OnlineComponent,
    AuthComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppSharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
