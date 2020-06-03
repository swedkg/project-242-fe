import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";
import { UserService } from "../../_services/user.service";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  constructor(public dialog: MatDialog, private UserService: UserService) {}

  /**
   * sidenavToggle
   */
  public sidenavToggle() {
    alert("click");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      // console.log("The dialog was closed");
    });
  }

  logout() {
    this.UserService.logout();
  }

  get isLoggedIn() {
    return this.UserService.isLoggedIn;
  }

  ngOnInit() {}
}
