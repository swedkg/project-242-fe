import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { RegisterDialogComponent } from "../register-dialog/register-dialog.component";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  currentDialog: MatDialogRef<RegisterDialogComponent> = null;
  destroy = new Subject<any>();

  constructor(matDialog: MatDialog, route: ActivatedRoute, router: Router) {
    // console.log(route.params);

    route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
      // console.log(params);

      if (this.currentDialog) {
        this.currentDialog.close();
      }

      this.currentDialog = matDialog.open(RegisterDialogComponent);
      this.currentDialog.afterOpened().subscribe((data) => {
        // router.navigateByUrl("/register");
      });
      this.currentDialog.afterClosed().subscribe((result) => {
        // console.log("The registration dialog was closed");
        router.navigateByUrl("/");
      });
    });
  }

  ngOnInit() {}
}
