import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../../modules/material.module";
import { LoginComponent } from "./login.component";
import { routes } from "../../app.routing";
import { RegisterComponent } from "../register/register.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [LoginComponent, LoginDialogComponent, RegisterComponent]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [LoginDialogComponent] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
