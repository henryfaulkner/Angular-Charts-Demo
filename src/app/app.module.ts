import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarComponent } from './shared/bar/bar.component';
import { PieComponent } from './shared/pie/pie.component';
import { ScatterComponent } from './shared/scatter/scatter.component';

const components = [AppComponent, BarComponent, PieComponent, ScatterComponent];
const modules = [BrowserModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...components, ...modules],
  bootstrap: [AppComponent],
})
export class AppModule {}
