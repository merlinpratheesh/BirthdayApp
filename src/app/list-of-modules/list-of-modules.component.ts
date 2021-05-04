import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-of-modules',
  templateUrl: './list-of-modules.component.html',
  styleUrls: ['./list-of-modules.component.scss']
})
export class ListOfModulesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  online(){
    this.router.navigate(['/online']);

  }
  auth(){
    this.router.navigate(['/auth']);

  }
  frontscreen(){
    this.router.navigate(['/frontscreen']);

  }
  memberdetails(){
    this.router.navigate(['/memberdetails']);

  }
  myMapDetails(){
    this.router.navigate(['/mymapdetails']);

  }

  profilepage(){
    this.router.navigate(['/profilepage']);

  }



}
