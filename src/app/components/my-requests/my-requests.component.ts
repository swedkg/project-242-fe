import { Component, Input, OnInit } from "@angular/core";
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
  selector: "app-my-requests",
  templateUrl: "./my-requests.component.html",
  styleUrls: ["./my-requests.component.scss"]
})
export class MyRequestsComponent implements OnInit {
  // @Input()
  activeTab: number;

  myRequests: any[] = [];
  myRequestsLength: number;
  subscription: Subscription;
  requests$: Observable<AidRequest[]>;
  requests: any[] = [];
  activeThread: Number;
  activeMessagingTab: number;
  showMessages: boolean;
  chat$: object;
  responder_id: number;
  expandedPanel: number;
  openPanel: number;

  current_user: User;

  constructor(
    private store: Store<fromStore.PlatformState>,
    private SidenavService: SidenavService,
    private HelpRequestsService: HelpRequestsService,
    private MessageFlowService: MessageFlowService,
    private UserService: UserService
  ) {}

  handleShowMessages(request_id, responder_id) {
    this.activeThread = request_id;
    this.responder_id = responder_id;
    // this.SidenavService.setActiveSidenavTab(this.SidenavService.tabs.myRequests);
    this.SidenavService.setCurrentTab(this.activeTab);
    this.SidenavService.setActiveThread(request_id);
    this.SidenavService.setOpenChat(true);
    console.log(this);
  }

  handleRemoveResponder(fullfilment) {
    // we need the fullfilment id here
    this.MessageFlowService.removeResponder(fullfilment);
  }

  handleMarkFulfilled(request_id) {
    event.stopPropagation();
    this.HelpRequestsService.markFulfilled(request_id);
  }

  handleRepublishRequest(request_id) {
    event.stopPropagation();
    this.HelpRequestsService.republishRequest(request_id);
  }

  setStep(id) {
    this.openPanel = id;
    console.log(id);
  }

  ngOnInit() {
    let _getChatForResponder;

    // TODO: now that we have the websocklets working
    // we do not need all this
    this.SidenavService.getOpenChat().subscribe(open => {
      console.log("Step 1");

      console.log("activeTab", this.activeTab, open);

      if (this.activeTab !== 2) return null;
      console.log("Step 2");

      if (open === true) {
        console.log("Step 3");

        setTimeout(() => {}, 0);
        this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
        // this.store.dispatch(new fromStore.LoadRequests());

        _getChatForResponder = this.store
          .select(fromStore.getChatForResponder, {
            request_id: this.activeThread,
            responder_id: this.responder_id
          })
          .subscribe(data => {
            this.chat$ = data;
            this.SidenavService.setActiveChat(data);
            console.log(
              "____",
              this.chat$,
              this.activeThread,
              this.responder_id
            );

            // this.SidenavService.setActiveThread(this.activeThread);
          });

        // console.log(open, this, this.chat$);
        this.showMessages = open;
        // console.log('-----------', this);
      } else {
        if (_getChatForResponder) _getChatForResponder.unsubscribe();
        return null;
      }
      console.log("3");
    });

    this.UserService.currentUserSubject.subscribe(data => {
      this.current_user = data;
      console.log(this.current_user);

      if (this.UserService.isLoggedIn) {
        // this.store.dispatch(new fromStore.LoadRequests());

        this.requests$ = this.store.select(
          fromStore.getUserRequests,
          this.current_user.id
        );

        this.requests$.subscribe(data => {
          this.myRequestsLength = data.length;
          console.log("fromStore.getUserRequests", data);
        });
      }
    });

    this.SidenavService.getExpandedAccordionPanel().subscribe(
      data => (this.expandedPanel = data)
    );

    this.SidenavService.getActiveThread().subscribe(data => {
      this.activeThread = data;
      // console.log('activeThread', data);
    });

    this.SidenavService.getActiveSidenavTab().subscribe(data => {
      this.activeTab = data;
      console.log("getActiveSidenavTab", this.activeTab);
    });

    this.MessageFlowService.getRemovedResponder().subscribe(data => {
      console.log(data, this);
      this.store.dispatch(new fromStore.LoadRequests());
      setTimeout(() => {
        this.expandedPanel = this.openPanel;
      }, 0);
    });
  }

  ngOnDestroy() {
    console.log("we are out");
  }
}
