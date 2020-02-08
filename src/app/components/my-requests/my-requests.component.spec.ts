import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { MaterialModule } from "../../modules/material.module";
import { reducers } from "../../store";
import {
  HelpRequestsService,
  MessageFlowService,
  SidenavService,
  UserService
} from "../../_services";
import { MyRequestsComponent } from "./my-requests.component";

describe("MyRequestsComponent", () => {
  let component: MyRequestsComponent;
  let fixture: ComponentFixture<MyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("aidPlatform", reducers)
      ],
      providers: [
        UserService,
        MessageFlowService,
        HelpRequestsService,
        SidenavService
      ],
      declarations: [MyRequestsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
