import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import * as firebase from 'firebase/app';


export interface allDates {
  DOB: Date;
  Anniv: Date;
  DOD:Date;
}
@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  leftMenuPress = new Subject();
  user$: any;


  constructor(private db: AngularFirestore) { }

  

 

}
