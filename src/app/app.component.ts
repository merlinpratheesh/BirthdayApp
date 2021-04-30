import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { allDates } from './service/userdata.service';
import * as firebase from 'firebase';
import * as  Firestore  from '@angular/fire/firestore';
import '@firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zerodha';
  events: string[] = [];


  public DOB;
  public Anniv;
  public DOD;
  public dateForm = new FormGroup({
    DOB: new FormControl(),
    Anniv: new FormControl(),
    DOD: new FormControl(),
  });

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;

  Sections = of(undefined);
  getAlldatesSubscription: Subscription;
  getAlldatesBehaviourSub = new BehaviorSubject(undefined);

  getAlldates = (Dates: AngularFirestoreDocument<allDates>) => {
    if (this.getAlldatesSubscription !== undefined) {
      this.getAlldatesSubscription.unsubscribe();
    }
    this.getAlldatesSubscription = Dates.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getAlldatesBehaviourSub.next(undefined);
      } else {
        if (val.length === 0) {
          this.getAlldatesBehaviourSub.next(null);
        } else {
          if (val.length !== 0) {
            this.getAlldatesBehaviourSub.next(val.newItem);
          }
        }
      }
    });
    return this.getAlldatesBehaviourSub;
  };
  dateRef: BehaviorSubject<any>;
 
  
  constructor(private storage: AngularFireStorage, private db: AngularFirestore,private changeDetectorRef: ChangeDetectorRef ) {

    const ref = this.storage.ref('/users');
    this.profileUrl = ref.getDownloadURL();

    this.dateRef = this.getAlldates((this.db.doc('testme/one-id')));
    console.log(this.dateRef);


  }



  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'users';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
  update() {


    const newItem = {
      DOB: this.dateForm.get('DOB').value,
      Anniv: this.dateForm.get('Anniv').value,
      DOD: this.dateForm.get('DOD').value,
    }
    console.log(newItem);
 

    const res = this.db.collection('testme').doc('one-id').set({newItem}, {merge:true});
  }
}

