import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { AdministrationComponent } from './administration/administration.component';

const routes: Routes = [
  { path:'' , redirectTo:'/reserveLab', pathMatch:'full'},
  { path: 'reserveLab', component: ReservationComponent},
  { path: 'administration', component: AdministrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
