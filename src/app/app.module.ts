import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [AppComponent, MapComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAxU077IxAHkK25YbCs6rRwwTw7Gx-MHg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
