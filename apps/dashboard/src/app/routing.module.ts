import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent, WildComponent } from '@tv/ui-library';
import { ShowsComponent } from './shows/shows.component';

const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'wild', component: WildComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'wild', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
