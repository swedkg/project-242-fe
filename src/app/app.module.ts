import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmOverlays } from 'agm-overlays';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MapComponent } from './map/map.component';
import { MaterialModule } from './material/material.module';
import { MessagingComponent } from './messaging/messaging.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmitRequestContentComponent } from './submit-request-content/submit-request-content.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { HelpRequestsService } from './_services/help-requests.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayoutComponent,
    SidebarComponent,
    SubmitRequestComponent,
    SubmitRequestContentComponent,
    MessagingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AgmSnazzyInfoWindowModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCw9TlphTR3feHATjeQhqJKA8qP5wGjLjQ',
      libraries: ['places']
    })
  ],
  providers: [HelpRequestsService],
  entryComponents: [SubmitRequestContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
