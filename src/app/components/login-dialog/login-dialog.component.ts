import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { first } from "rxjs/operators";
import * as fromStore from "../../store";
import { SnackbarService } from "../../_services/snackbar.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"],
})
export class LoginDialogComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private UserService: UserService,
    public matDialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public SnackbarService: SnackbarService,
    private store: Store<fromStore.PlatformState>
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
      password: this.loginForm.controls.password.value,
    };
    // // console.log(payload);
    this.UserService.login(payload)
      .pipe(first())
      .subscribe(
        (data) => {
          // console.log(data);
          this.closeDialog();
          this.store.dispatch(new fromStore.LoadRequests());
          this.store.dispatch(new fromStore.RemoveAllMessages());
          // this.store.dispatch(new fromStore.LoadMessages(data.id))
          window.dispatchEvent(new Event("resize"));

          // this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.SnackbarService.show(error.error.login_error);
          // console.log(error);
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
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      password: new FormControl("", [Validators.required]),
    });
  }
}
