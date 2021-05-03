import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first} from 'rxjs/operators';
import { UserdataService } from '../service/userdata.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  showspinner: boolean = null;
  arrow = false;
  flexsetting = '0 0 3.5%';
  flexMobileSetting = '0 0 12.5%';
  @ViewChild('leftSidenav', { static: true }) public LeftSidenav: MatSidenav;
  @ViewChild('rightSidenav', { static: true }) public rightSidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  // tslint:disable-next-line: max-line-length
  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, public auth: UserdataService, media: MediaMatcher, private cdr: ChangeDetectorRef) {
    this.auth.leftMenuPress.subscribe(userpress =>{
      if(userpress === true){
        if(this.arrow === true){
          this.togglesidenav(false);
        }
        this.LeftSidenav.toggle();
      }      
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    
   }

  async signOut(){
    await this.afAuth.signOut();
    //this.router.navigate(['login']);
  }
   switchoffspinner(state: boolean){
    this.showspinner = false;
   }
  togglesidenav(statesidenav: boolean){    
    //console.log('toggled',statesidenav);
    this.arrow = statesidenav;
    switch(statesidenav){
      case true:
        this.flexsetting = '0 0 9%';//desktop
        this.flexMobileSetting = '0 0 30%';
        break;
      case false:
        this.flexsetting = '0 0 3.5%';//desktop
        this.flexMobileSetting = '0 0 12.5%';
        break;
    }
    //console.log('Flex for mobile', this.flexMobileSetting );
  }
  menutogglesidenav(){
    this.LeftSidenav.toggle();
    console.log('arow', this.arrow);
    switch(this.arrow){
      case true:
        this.arrow = !this.arrow;
        //this.auth.minifabstatus(this.arrow);
        this.flexMobileSetting = '0 0 12.5%';
        break;
      case false:
        break;
    }
  }
  getFlexOptions(){
    return  `${this.flexsetting}`;
  }
  getMobileFlexOptions(){
    return  `${this.flexMobileSetting}`;
  }
  ngOnInit(): void {
  }

}
