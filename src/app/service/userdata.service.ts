import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { of, merge, fromEvent, Observable,Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


export interface userProfile {
  userAuthenObj: firebase.User,//Receive User obj after login success
} 

@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  isOnline$!: Observable<boolean>;

  constructor(public auth: AngularFireAuth, private db: AngularFirestore) {


      this.isOnline$ = merge(
        of(null),
        fromEvent(window, 'online'),
        fromEvent(window, 'offline')
      ).pipe(map(() => navigator.onLine));
  
   }
   login() {
    return this.auth.signInWithPopup(new (firebase.auth as any).GoogleAuthProvider()).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      if (errorCode === 'auth/popup-closed-by-user' || errorCode === 'auth/network-request-failed') {

        //alert('Check Internet Connection');
        location.reload();
      }
    });
  }


}
