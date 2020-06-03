import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import * as fromStore from "../../store";
import { AidRequest } from "../../_models/aidRequest.model";
import { User } from "../../_models/user";
import { HelpRequestsService } from "../../_services/help-requests.service";
import { MessageFlowService } from "../../_services/message-flow.service";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-all-requests",
  templateUrl: "./all-requests.component.html",
  styleUrls: ["./all-requests.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllRequestsComponent implements OnInit {
  // requests$: Observable;
  requests: any[] = [];
  subscription: Subscription;

  request_id: number;

  current_user: User;
  isLoggedIn: boolean = false;

  respondToRequest(id) {
    this.request_id = id;
    this.MessageFlowService.respondToRequest(id);

    // if everything goes well,
    // continue with the rest
  }

  goToMessages(id, tab) {
    this.SidenavService.setActiveThread(id);
    this.SidenavService.setActiveSidenavTab(tab);
    this.SidenavService.setExpandedAccordionPanel(id);
    // this.SidenavService.setOpenChat(true);
    // this.SidenavService.setSidenavOpen(false);
    // this.SidenavService.setMessagingSidenavOpened(true);
    setTimeout(function () {}.bind(this), 100);
  }

  constructor(
    private store: Store<fromStore.PlatformState>,
    private helpRequestsService: HelpRequestsService,
    private SidenavService: SidenavService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService
  ) {}
  ngOnInit() {
    this.UserService.currentUserSubject.subscribe((data) => {
      if (this.UserService.isLoggedIn) {
        this.isLoggedIn = this.UserService.isLoggedIn;
        this.current_user = this.UserService.currentUserDetails;
      }
    });

    this.subscription = this.helpRequestsService
      .getInboundRequestsList()
      .subscribe((message) => {
        if (message) {
          this.requests = [];
          this.requests = message.requests.filter((r) => {
            return !r.isUser;
          });
          // this.requests.push(message);
          // // console.log(message, this.requests);
        } else {
          // clear requests when empty message received
          this.requests = [];
        }
      });

    this.MessageFlowService.getResponseToRequest().subscribe((data) => {
      if (data === 201) {
        // this.store.dispatch(new fromStore.LoadRequests());

        // this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
        setTimeout(
          function () {
            this.SidenavService.setActiveSidenavTab(
              this.SidenavService.tabs.myResponses
            );
            this.SidenavService.setActiveThread(this.request_id);
            this.SidenavService.setExpandedAccordionPanel(this.request_id);
            // this.SidenavService.setOpenChat(true);
          }.bind(this),
          0
        );

        // console.log("getResponseToRequest", data, this);
      }
    });
    // this.store.select(fromStore.getAllRequests).subscribe(state => {
    //   // console.log(state);
    // });
    // this.requests$ = this.store.select(fromStore.getAllRequests);
    // this.store.dispatch(new fromStore.LoadRequests());
  }
}
