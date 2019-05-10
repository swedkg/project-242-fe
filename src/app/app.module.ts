import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmOverlays } from 'agm-overlays';
import { AppComponent } from './app.component';
import { HelpRequestsService } from './_services/help-requests.service';
import { LayoutComponent } from './layout/layout.component';
import { MapComponent } from './map/map.component';
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, MapComponent, LayoutComponent, SidebarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AgmSnazzyInfoWindowModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAxU077IxAHkK25YbCs6rRwwTw7Gx-MHg'
    })
  ],
  providers: [HelpRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
