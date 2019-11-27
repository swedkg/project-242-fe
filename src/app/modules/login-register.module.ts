import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginDialogComponent } from "../components/login-dialog/login-dialog.component";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginDialogComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  entryComponents: [LoginDialogComponent]
})
export class LoginRegisterModule {}
