import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { allDates, UserdataService } from './service/userdata.service';
import * as  Firestore from '@angular/fire/firestore';
import '@firebase/firestore';
import { doc, docData } from 'rxfire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 

  constructor(private router: Router, public auth:UserdataService  ) {
    
  
}

Login(){
  this.router.navigate(['/customers']);
}
}