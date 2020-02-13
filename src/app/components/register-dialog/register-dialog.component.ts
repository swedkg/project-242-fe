import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UserService } from "../../_services/user.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-register-dialog",
  templateUrl: "./register-dialog.component.html",
  styleUrls: ["./register-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RegisterDialogComponent implements OnInit {
  public registrationForm: FormGroup;
  image: "";
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private UserService: UserService
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
    console.log(ev, this.image);
  }

  // TODO: save cookie in local storage after success
  // TODO: open sidebar after succuessfull login
  // TODO: image size limit
  // TODO: png, jpg, pdf
  // TODO: mobile devices
  // TODO: wireframes for desktop and mobile

  register() {
    const formData = new FormData();

    for (var key in this.registrationForm.value) {
      // console.log(key, this.registrationForm.value[key]);

      formData.set(key, this.registrationForm.value[key]);
      // console.log(formData.getAll(key));
    }

    formData.set("picture", this.image);

    // console.log(formData.getAll("image"));

    formData.forEach((value, key) => {
      console.log("%s: %s", key, value);
    });

    this.UserService.register(formData)
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

    // for (var key of formData.entries()) {
    //   console.log(key, formData[key]);
    // }

    // console.log(this.registrationForm.value, formData);
  }

  passwordMatch(fieldControl: FormControl) {
    if (!this.registrationForm) return false;
    return fieldControl.value === this.registrationForm.controls.password.value
      ? null
      : {
          passwordMatch: true
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
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        this.passwordMatch.bind(this)
      ])
    });
  }
}
