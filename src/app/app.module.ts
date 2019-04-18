import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HelpRequestsService } from './help-requests.service';
import { LayoutComponent } from './layout/layout.component';
import { MapComponent } from './map/map.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent, MapComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAxU077IxAHkK25YbCs6rRwwTw7Gx-MHg'
    })
  ],
  providers: [HelpRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
