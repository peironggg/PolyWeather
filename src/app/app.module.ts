import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { PanelComponent } from './panel/panel.component';
import { RouterModule } from '@angular/router';
import { allAppRoutes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(allAppRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
