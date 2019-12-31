import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UserService } from "../../_services/user.service";
import { first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"]
})
export class LoginDialogComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private UserService: UserService,
    public matDialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  closeDialog() {
    this.dialogRef.close();
    this.router.navigateByUrl("/");
  }

  register() {
    event.stopPropagation();

    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.router.navigateByUrl("/register");
  }

  login() {
    let payload = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
    console.log(payload);
    this.UserService.login(payload)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.closeDialog();
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.alertService.error(error);
          console.log(error);

          // this.loading = false;
        }
      );
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl("", [Validators.required])
    });
  }
}
