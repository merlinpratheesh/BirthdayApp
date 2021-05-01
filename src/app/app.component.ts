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

  constructor(public afAuth: AngularFireAuth, public developmentservice: UserdataService) {




  }



}

