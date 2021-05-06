import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,      // <-- need

})
export class ProfilePageComponent implements OnInit {

  constructor(  private changeDetection: ChangeDetectorRef,) { }

  ngOnInit(): void {
  }

}
