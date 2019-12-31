import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  currentDialog: MatDialogRef<LoginDialogComponent> = null;
  destroy = new Subject<any>();

  constructor(
    public matDialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      console.log(params);

      if (this.currentDialog) {
        this.currentDialog.close();
      }

      this.currentDialog = matDialog.open(LoginDialogComponent);

      this.currentDialog.backdropClick().subscribe(data => {
        console.log("The login dialog was closed");
        router.navigateByUrl("/");
      });
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
