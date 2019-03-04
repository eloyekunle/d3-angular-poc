import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DonutComponent } from './donut/donut.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DonutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'donut', component: DonutComponent},
      {path: '', component: AppComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
