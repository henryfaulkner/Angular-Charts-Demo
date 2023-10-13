import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'client-dashboard', component: ClientDashboardComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AppRoutingModule {}
