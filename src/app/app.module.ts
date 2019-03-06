import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DonutComponent } from './donut/donut.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DonutComponent,
    HomeComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'donut', component: DonutComponent},
      {path: 'bar', component: BarComponent},
      {path: '', component: HomeComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
