import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { MetaReducer, StoreModule } from "@ngrx/store";
// import { environment } from '../environments/environment';
// not used in production
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AgmOverlays } from "agm-overlays";
import { ActionCableService } from "angular2-actioncable";
import { storeFreeze } from "ngrx-store-freeze";
import { AppComponent } from "./app.component";
import { appRoutingModule } from "./app.routing";
import { CounterComponent } from "./components/counter/counter.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { MapComponent } from "./components/map/map.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { LoginRegisterModule } from "./modules/login-register.module";
import { MaterialModule } from "./modules/material.module";
import { SidenavModule } from "./modules/sidenav.module";
import { effects, reducers } from "./store";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { HelpRequestsService } from "./_services/help-requests.service";
import { MessageFlowService } from "./_services/message-flow.service";
import { SnackbarService } from "./_services/snackbar.service";
import { UserService } from "./_services/user.service";
import { WebsocketsService } from "./_services/websockets.service";
import { APP_BASE_HREF } from "@angular/common";

const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayoutComponent,
    SidenavComponent,
    CounterComponent,
    SnackbarComponent,
  ],
  imports: [
    appRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SidenavModule,
    LoginRegisterModule,
    AgmSnazzyInfoWindowModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCw9TlphTR3feHATjeQhqJKA8qP5wGjLjQ",
      libraries: ["places"],
    }),
    StoreModule.forFeature("aidPlatform", reducers),
    EffectsModule.forFeature(effects),
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: "/" },
    HelpRequestsService,
    MessageFlowService,
    UserService,
    SnackbarService,
    ActionCableService,
    WebsocketsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
