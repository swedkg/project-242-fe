import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MapComponent } from "./map.component";
import { AgmCoreModule } from "@agm/core";
import { AgmOverlays } from "agm-overlays";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { MaterialModule } from "../../modules/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../../store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  UserService,
  SidenavService,
  HelpRequestsService
} from "../../_services";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

describe("MapComponent", () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("aidPlatform", reducers),
        HttpClientTestingModule,
        AgmSnazzyInfoWindowModule,
        AgmOverlays,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyCw9TlphTR3feHATjeQhqJKA8qP5wGjLjQ",
          libraries: ["places"]
        })
      ],
      declarations: [MapComponent, LoginDialogComponent],
      providers: [HelpRequestsService, SidenavService, UserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
