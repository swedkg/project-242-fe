import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { MaterialModule } from "../../modules/material.module";
import { reducers } from "../../store";
import { AllRequestsComponent } from "./all-requests.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("AllRequestsComponent", () => {
  let component: AllRequestsComponent;
  let fixture: ComponentFixture<AllRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        // BrowserAnimationsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("aidPlatform", reducers)
      ],
      declarations: [AllRequestsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
