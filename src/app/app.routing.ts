import { Routes, RouterModule } from "@angular/router";

// import { HomeComponent } from './home';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginDialogComponent } from "./components/login-dialog/login-dialog.component";

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
