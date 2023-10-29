import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TooltipModule, TooltipsModule } from '@progress/kendo-angular-tooltip';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { DisposablePageComponent } from './pages/disposable-page/disposable-page.component';
import { ChartjsBarComponent } from './shared/chartjs/chartjs-bar/chartjs-bar.component';
import { ChartjsPieComponent } from './shared/chartjs/chartjs-pie/chartjs-pie.component';
import { ChartjsScatterComponent } from './shared/chartjs/chartjs-scatter/chartjs-scatter.component';
import { ClientCapacityUtilizationGraphComponent } from './shared/chartjs/client-capacity-utilization-graph/client-capacity-utilization-graph.component';
import { CreditRequestUtilizationComponent } from './shared/chartjs/credit-request-utilization/credit-request-utilization.component';
import { CustomerPortfolioPortionsGraphComponent } from './shared/chartjs/customer-portfolio-portions-graph/customer-portfolio-portions-graph.component';
import { FlaggedInvoiceCountGraphComponent } from './shared/chartjs/flagged-invoice-count-graph/flagged-invoice-count-graph.component';
import { NowaccountDifferenceGraphComponent } from './shared/chartjs/nowaccount-difference-graph/nowaccount-difference-graph.component';
import { ChartjsGridComponent } from './shared/drag-n-drop/charts/chartjs-grid/chartjs-grid.component';
import { ClientDashboardDragDropGridComponent } from './shared/drag-n-drop/client-dashboard-drag-drop-grid/client-dashboard-drag-drop-grid.component';
import { DragDropGridCheckboxDropdownComponent } from './shared/drag-n-drop/drag-drop-grid-checkbox-dropdown/drag-drop-grid-checkbox-dropdown.component';
import { DragDropGridComponent } from './shared/drag-n-drop/drag-drop-grid/drag-drop-grid.component';
import { DropzoneContainerComponent } from './shared/drag-n-drop/photos/dropzone-container/dropzone-container.component';
import { SidebarContainerComponent } from './shared/drag-n-drop/photos/sidebar-container/sidebar-container.component';
import { AccountInfoComponent } from './shared/util/account-info/account-info.component';
import { AlertIconComponent } from './shared/util/alert-icon/alert-icon.component';
import { DashboardGridConfigSideswipeComponent } from './shared/util/dashboard-grid-config-sideswipe/dashboard-grid-config-sideswipe.component';
import { HeaderComponent } from './shared/util/header/header.component';
import { NavTileComponent } from './shared/util/nav-tile/nav-tile.component';
import { NowaccountShellComponent } from './shared/util/nowaccount-shell/nowaccount-shell.component';
import { NowaccountSidenavComponent } from './shared/util/nowaccount-sidenav/nowaccount-sidenav.component';
import { RemittanceComponent } from './shared/util/remittance/remittance.component';
import { GraphDialogComponent } from './shared/util/graph-dialog/graph-dialog.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';

const components = [
  AppComponent,
  ChartjsBarComponent,
  ChartjsPieComponent,
  ChartjsScatterComponent,
  SidebarContainerComponent,
  DropzoneContainerComponent,
  DragDropGridComponent,
  DragDropGridCheckboxDropdownComponent,
  FlaggedInvoiceCountGraphComponent,
  NowaccountDifferenceGraphComponent,
  ClientDashboardDragDropGridComponent,
  ClientDashboardComponent,
  ChartjsGridComponent,
  DisposablePageComponent,
  CreditRequestUtilizationComponent,
  ClientCapacityUtilizationGraphComponent,
  CustomerPortfolioPortionsGraphComponent,
  NavTileComponent,
  NowaccountShellComponent,
  NowaccountSidenavComponent,
  HeaderComponent,
  DashboardGridConfigSideswipeComponent,
  AccountInfoComponent,
  RemittanceComponent,
  AlertIconComponent,
  GraphDialogComponent
];
const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  NgChartsModule,
  HttpClientModule,
  DragDropModule,
  AppRoutingModule,
  LayoutModule,
  TooltipModule,
  TooltipsModule,
  DialogsModule,
  InputsModule,
  LabelModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...components, ...modules],
  bootstrap: [AppComponent],
})
export class AppModule {}
