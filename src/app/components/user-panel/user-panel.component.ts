import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { User } from "../../_models/user";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";
import { SubmitRequestContentComponent } from "../submit-request-content/submit-request-content.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-user-panel",
  templateUrl: "./user-panel.component.html",
  styleUrls: ["./user-panel.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UserPanelComponent implements OnInit {
  user: User;

  constructor(
    private UserService: UserService,
    private SidenavService: SidenavService,
    public MatDialog: MatDialog
  ) {}

  logout() {
    this.UserService.logout();
    this.SidenavService.setSidenavOpen(false);
  }

  get isLoggedIn() {
    return this.UserService.isLoggedIn;
  }

  addNewRequest(): void {
    const dialogRef = this.MatDialog.open(SubmitRequestContentComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  ngOnInit() {
    this.UserService.currentUserSubject.subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }
}
