import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AgmOverlays } from "agm-overlays";
import { SidenavService } from "../app/_services/sidenav.service";
import { AppComponent } from "./app.component";
import { routes } from "./app.routing";
import { AllRequestsComponent } from "./components/all-requests/all-requests.component";
import { ChatComponent } from "./components/chat/chat.component";
import { CounterComponent } from "./components/counter/counter.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { MapComponent } from "./components/map/map.component";
import { MyRequestsComponent } from "./components/my-requests/my-requests.component";
import { MyResponsesComponent } from "./components/my-responses/my-responses.component";
import { RegisterComponent } from "./components/register/register.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { UserPanelComponent } from "./components/user-panel/user-panel.component";
import { MaterialModule } from "./modules/material.module";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        AgmSnazzyInfoWindowModule,
        AgmOverlays,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyCw9TlphTR3feHATjeQhqJKA8qP5wGjLjQ",
          libraries: ["places"]
        }),
        StoreModule.forRoot({}),
        StoreModule.forFeature("aidPlatform", reducers),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        SidenavComponent,
        SnackbarComponent,
        UserPanelComponent,
        AllRequestsComponent,
        MyResponsesComponent,
        MyRequestsComponent,
        ChatComponent,
        LayoutComponent,
        MapComponent,
        CounterComponent,
        LoginComponent,
        RegisterComponent
      ],
      providers: [SidenavService]
    }).compileComponents();
  }));

  it("should be created the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it("should be created the app", async(
  //   inject([SidenavService], () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     const app = fixture.debugElement.componentInstance;
  //     expect(app).toBeTruthy();
  //   })
  // ));
});
