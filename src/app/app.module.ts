import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
// import { environment } from '../environments/environment';
// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AgmOverlays } from 'agm-overlays';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MapComponent } from './components/map/map.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './modules/material.module';
import { SidenavModule } from './modules/sidenav.module';
import { effects, reducers } from './store';
import { HelpRequestsService } from './_services/help-requests.service';
import { MessageFlowService } from './_services/message-flow.service';

const environment = {
  development: true,
  production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent, MapComponent, LayoutComponent, SidenavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SidenavModule,
    AgmSnazzyInfoWindowModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCw9TlphTR3feHATjeQhqJKA8qP5wGjLjQ',
      libraries: ['places']
    }),
    StoreModule.forFeature('aidPlatform', reducers),
    EffectsModule.forFeature(effects),
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [HelpRequestsService, MessageFlowService],
  bootstrap: [AppComponent]
})
export class AppModule {}
