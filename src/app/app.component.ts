import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage'
import { finalize, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import * as  Firestore from '@angular/fire/firestore';
import '@firebase/firestore';
import firebase from 'firebase/app';
import { doc, docData } from 'rxfire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserdataService, userProfile } from './service/userdata.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerodha';
  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
  };
  myauth;
  subjectauth = new BehaviorSubject(undefined);
  getObservableauthStateSub: Subscription = new Subscription;
  getObservableauthState = (authdetails: Observable<firebase.User>) => {
    if (this.getObservableauthStateSub !== undefined) {
      this.getObservableauthStateSub.unsubscribe();
    }
    this.getObservableauthStateSub = authdetails.subscribe((val: any) => {
      this.subjectauth.next(val);
      console.log(val);

    });
    return this.subjectauth;
  };
  myonline;
  subjectonline = new BehaviorSubject(undefined);
  getObservableonlineSub: Subscription = new Subscription;
  getObservableonine = (localonline: Observable<boolean>) => {
    this.getObservableonlineSub?.unsubscribe();
    this.getObservableonlineSub = localonline.subscribe((valOnline: any) => {
      this.subjectonline.next(valOnline);
      console.log(valOnline);

    });
    return this.subjectonline;
  };
  AfterOnlineCheckAuth: any;

  constructor(public afAuth: AngularFireAuth, public developmentservice: UserdataService) {
    this.myonline = this.getObservableonine(this.developmentservice.isOnline$);
    console.log('58',this.myonline);

    this.myauth = this.getObservableauthState(this.afAuth.authState);

    if(this.myonline=true){
      console.log('Online');
      if (this.myauth  !== null && this.myauth  !== undefined) {
        console.log('61',this.myauth );
      this.myuserProfile.userAuthenObj= this.myauth
    }
    else{
        console.log('Offline');
    }

  }



  }

  LogOff() {
    this.afAuth.signOut();

  }

}

