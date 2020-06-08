import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { first } from "rxjs/operators";
import { SnackbarService } from "../../_services/snackbar.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-register-dialog",
  templateUrl: "./register-dialog.component.html",
  styleUrls: ["./register-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterDialogComponent implements OnInit {
  public registrationForm: FormGroup;
  image: "";
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private UserService: UserService,
    public SnackbarService: SnackbarService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  };

  openInput() {
    document.getElementById("fileInput").click();
  }

  fileChange(ev) {
    this.image = ev.length > 0 ? ev[0] : null;
    // console.log(ev, this.image);
  }

  register() {
    const formData = new FormData();

    for (var key in this.registrationForm.value) {
      // // console.log(key, this.registrationForm.value[key]);

      formData.set(key, this.registrationForm.value[key]);
      // // console.log(formData.getAll(key));
    }

    formData.set("picture", this.image);

    // // console.log(formData.getAll("image"));

    formData.forEach((value, key) => {
      // console.log("%s: %s", key, value);
    });

    this.UserService.register(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          // console.log(data);
          this.closeDialog();
          // this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.SnackbarService.show(error.error.email[1]);
        }
      );
  }

  passwordMatch(fieldControl: FormControl) {
    if (!this.registrationForm) return false;
    return fieldControl.value === this.registrationForm.controls.password.value
      ? null
      : {
          passwordMatch: true,
        };
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      fileInput: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        this.passwordMatch.bind(this),
      ]),
    });
  }
}
