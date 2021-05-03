import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import '@firebase/firestore';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserdataService ,userProfile} from '../service/userdata.service';
import { map } from 'rxjs/operators';





@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

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
  AuthCheck: any;

  constructor( public afAuth: AngularFireAuth, public developmentservice: UserdataService) { 
  this.myauth = this.getObservableauthState(this.afAuth.authState);

  console.log(this.myauth);

    
  this.AuthCheck = this.myauth.pipe(
    map((authval: any) => {

      if (authval !== null && authval !== undefined) {   

        console.log(authval);
        this.myuserProfile.userAuthenObj= this.myauth
      }


      return (authval);
    }));

  }

  LogOff() {
    this.afAuth.signOut();

  }

}