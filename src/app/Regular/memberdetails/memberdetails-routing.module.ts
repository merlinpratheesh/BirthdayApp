import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterContentComponent } from './center-content/center-content.component';
import { MemberMainComponent } from './member-main/member-main.component';
import { MemberdetailsComponent } from './memberdetails.component';


const routes = [
  { path: '', 
  component: MemberdetailsComponent,
    children: [
      { path: '', outlet: 'leftsidebar', component: MemberMainComponent },
      { path: '', outlet: 'centercontent', component: CenterContentComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdetailsRoutingModule { }
