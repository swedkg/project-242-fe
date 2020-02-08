import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { AgmOverlays } from "agm-overlays";
import { routes } from "../../app.routing";
import { MaterialModule } from "../../modules/material.module";
import { reducers } from "../../store";
import { UserService } from "../../_services/user.service";
import { CounterComponent } from "../counter/counter.component";
import { LoginComponent } from "../login/login.component";
import { MapComponent } from "../map/map.component";
import { RegisterComponent } from "../register/register.component";
import { LayoutComponent } from "./layout.component";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MaterialModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("aidPlatform", reducers),
        AgmSnazzyInfoWindowModule,
        AgmOverlays,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyCw9TlphTR3feHATjeQhqJKA8qP5wGjLjQ",
          libraries: ["places"]
        })
      ],
      declarations: [
        LayoutComponent,
        MapComponent,
        CounterComponent,
        RegisterComponent,
        LoginComponent
      ],
      providers: [UserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should be created", async(
  //   inject([UserService], () => {
  //     expect(component).toBeTruthy();
  //   })
  // ));
  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
