import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserdataService } from '../service/userdata.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent {
  myonline;
  subjectonline = new BehaviorSubject(undefined);
  getObservableonlineSub: Subscription = new Subscription;

  getObservableonline = (localonline: Observable<boolean>) => {
    this.getObservableonlineSub?.unsubscribe();
    this.getObservableonlineSub = localonline.subscribe((valOnline: any) => {
      console.log(valOnline);
      this.subjectonline.next(valOnline);
    });
    return this.subjectonline;
  }
  OnlineCheck: undefined;
    constructor(
      public developmentservice: UserdataService)
  {
    this.myonline = this.getObservableonline(this.developmentservice.isOnline$);
    console.log(this.myonline)
    
    this.OnlineCheck = this.myonline.pipe(
      map((onlineval: any) => {
        if(onlineval === false) 
        {
          //alert('check internet Connection');
        }
        else
        {
          //alert('good Connection');
        }
        

        return (onlineval);
      }));

  }
}
