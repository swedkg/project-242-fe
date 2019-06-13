import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmOverlays } from 'agm-overlays';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MapComponent } from './components/map/map.component';
import { MaterialModule } from './modules/material.module';
import { HelpRequestsService } from './_services/help-requests.service';
import { MessageFlowService } from './_services/message-flow.service';

import { RequestsModule } from './modules/requests.module';
import { ResponsesModule } from './modules/responses.module';

import { Globals } from '../assets/globals';
import { StoreModule, MetaReducer } from '@ngrx/store';

// import { environment } from '../environments/environment';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';

const environment = {
  development: true,
  production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent, MapComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RequestsModule,
    ResponsesModule,
    AgmSnazzyInfoWindowModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCw9TlphTR3feHATjeQhqJKA8qP5wGjLjQ',
      libraries: ['places']
    }),

    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [HelpRequestsService, MessageFlowService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule {}
