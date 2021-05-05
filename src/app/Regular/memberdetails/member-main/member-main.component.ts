import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { allDates, UserdataService } from 'src/app/service/userdata.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage'



export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-member-main',
  templateUrl: './member-main.component.html',
  styleUrls: ['./member-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberMainComponent implements OnInit {
  ratioGutter = '10px';
  fitListHeight = '30vh';
  fitkidsHeight = '23vh';
  fitOptionsHeight= '15vh';

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  tiles: Tile[] = [
    {text: 'Title Gap', cols: 1, rows: 1, color: ''},
    {text: 'Title', cols: 6, rows: 1, color: ''},
    {text: 'Title Gap', cols: 1, rows: 1, color: ''},

    {text: 'Navi-left', cols: 1, rows: 4, color: ''},
    {text: 'man', cols: 3, rows: 4, color: 'lightgreen'},
    {text: 'women', cols: 3, rows: 4, color: 'lightpink'},
    {text: 'Navi-right', cols: 1, rows: 4, color: ''}];

  tileskids: Tile[] = [ 
    {text: 'Navi-left', cols: 1, rows: 4, color: ''},
    {text: 'girl', cols: 6, rows: 4, color: 'lightgreen'},
    {text: 'boy', cols: 6, rows: 4, color: 'lightpink'},
    {text: '3rdchild', cols: 6, rows: 4, color: 'lightgreen'},
    {text: 'Navi-right', cols: 1, rows: 4, color: ''}];

    

  tilesconrols: Tile[] = [ 
    {text: 'Navi-left', cols: 1, rows: 4, color: 'lightblue'},
    {text: 'Add', cols: 1, rows: 4, color: 'lightgreen'},
    {text: 'Remove', cols: 1, rows: 4, color: 'lightpink'},
    {text: 'Navi-right', cols: 1, rows: 4, color: 'lightblue'}
  ];

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
            this.getAlldatesBehaviourSub.next(val);
          }
        }
      }
    });
    return this.getAlldatesBehaviourSub;
  };
  Dates: BehaviorSubject<any>;
  profileUrl: Observable<string | null>;
  profileUrl1: Observable<string | null>;
  profile: any;


  
  constructor(public auth: UserdataService, private storage: AngularFireStorage,  private db: AngularFirestore,private library: FaIconLibrary) {

    this.Dates = this.getAlldates((this.db.doc('/testme/one-id')));
    console.log(this.Dates);

    const ref = this.storage.ref('/uid-father.jpg');
    const ref1 = this.storage.ref('/uid-mother.jpg');


    this.profileUrl = ref.getDownloadURL();
    this.profileUrl1 = ref1.getDownloadURL();

    console.log(this.profileUrl );

     this.profile=[this.profileUrl,this.profileUrl1]
    console.log(this.profile);

    
  
   }



  ngOnInit(): void {
  }
  log(val) { console.log(val); }

}
