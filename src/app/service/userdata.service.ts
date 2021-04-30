import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

export interface allDates {
  DOB: Date;
  Anniv: Date;
  DOD:Date;
}
@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  constructor(private db: AngularFirestore) { }

  allDatesfindOrCreate(): any {
    return this.db.doc(`projectList/uid`).valueChanges().pipe(first()).toPromise();
  }
  
  async privateProjectfindOrCreate(uid: string): Promise<allDates> {
    const project: allDates = await this.allDatesfindOrCreate();
    console.log('110 returned', project);

    if (project) {
      console.log('110', uid);
      return project;
    } else {
      return undefined;
    }
  }

}
