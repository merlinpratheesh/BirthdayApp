import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full'},
   // tslint:disable-next-line: max-line-length
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
