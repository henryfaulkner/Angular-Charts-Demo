import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { DisposablePageComponent } from './pages/disposable-page/disposable-page.component';

const routes: Routes = [
  { path: '', component: ClientDashboardComponent },
  { path: 'disposable', component: DisposablePageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
