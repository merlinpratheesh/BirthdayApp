import { Component, OnInit } from '@angular/core';
import {Directionality} from '@angular/cdk/bidi';


@Component({
  selector: 'app-bidi',
  templateUrl: './bidi.component.html',
  styleUrls: ['./bidi.component.scss']
})
export class BidiComponent implements OnInit {

  constructor(dir: Directionality) {
    console.log(dir.value);

    dir.change.subscribe((changes) => {
      console.log(changes)
    });
  }

  ngOnInit() {
  }

}


