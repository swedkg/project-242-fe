import { Component, OnInit, OnDestroy } from "@angular/core";
import { SnackbarService } from "../../_services/snackbar.service";
import { Subscription } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  private show = false;
  private message: string = "This is snackbar";
  private type: string = "success";
  private snackbarSubscription: Subscription;

  constructor(
    public snackbarService: SnackbarService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.snackbarSubscription = this.snackbarService.snackbarState.subscribe(
      (state) => {
        if (state.type) {
          this.type = state.type;
        } else {
          this.type = "success";
        }
        this.message = state.message;
        this._snackBar.open(state.message, "", {
          verticalPosition: "bottom",
          horizontalPosition: "center",
        });
        // this.show = state.show;
        setTimeout(() => {
          this._snackBar.dismiss();
          this.message = "";
        }, 3000);
      }
    );
  }

  ngOnDestroy() {
    if (this.snackbarSubscription) this.snackbarSubscription.unsubscribe();
  }
}
