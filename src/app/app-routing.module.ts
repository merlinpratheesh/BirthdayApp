import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListOfModulesComponent } from './list-of-modules/list-of-modules.component';
import { AuthComponent } from './Regular/auth/auth.component';
import { OnlineComponent } from './Regular/online/online.component';


const routes: Routes = [
  { path: '', redirectTo: 'ListOfModules', pathMatch: 'full'},
   { path: 'ListOfModules', component: ListOfModulesComponent },
   { path: 'online', component: OnlineComponent },
   { path: 'auth', component: AuthComponent },
  { path: 'frontscreen', loadChildren: () => import('./Regular/frontscreen/frontscreen.module').then(m => m.FrontscreenModule) },
  { path: 'memberdetails', loadChildren: () => import('./Regular/memberdetails/memberdetails.module').then(m => m.MemberdetailsModule) },

   { path: '**', redirectTo: 'ListOfModules', pathMatch: 'full'}




]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


