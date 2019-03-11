import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DonutComponent } from './donut/donut.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BarComponent } from './bar/bar.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DonutComponent,
    HomeComponent,
    BarComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'donut', component: DonutComponent},
      {path: 'bar', component: BarComponent},
      {path: 'chart', component: ChartComponent},
      {path: '', component: HomeComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
