import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginDialogComponent } from "../components/login-dialog/login-dialog.component";
import { LoginComponent } from "../components/login/login.component";
import { RegisterDialogComponent } from "../components/register-dialog/register-dialog.component";
import { RegisterComponent } from "../components/register/register.component";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    LoginDialogComponent,
    LoginComponent,
    RegisterComponent,
    RegisterDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent]
})
export class LoginRegisterModule {}
