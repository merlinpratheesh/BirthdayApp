import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterContentComponent } from './center-content/center-content.component';
import { CustomersComponent } from './customers.component';
import { LeftSidenavContentComponent } from './left-sidenav-content/left-sidenav-content.component';


const routes = [
  { path: '',
  component: CustomersComponent,
    children: [
      { path: '', outlet: 'leftsidebar', component: LeftSidenavContentComponent },
      { path: '', outlet: 'centercontent', component: CenterContentComponent }
    ]}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
