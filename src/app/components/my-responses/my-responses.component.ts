import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import * as fromStore from "../../store";
import { AidRequest } from "../../_models/aidRequest.model";
import { User } from "../../_models/user";
import { MessageFlowService } from "../../_services/message-flow.service";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-my-responses",
  templateUrl: "./my-responses.component.html",
  styleUrls: ["./my-responses.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MyResponsesComponent implements OnInit {
  @Input() activeTab: number;

  // myResponses$: Observable<Message>;
  allResponses: any[] = [];
  myResponses$: Observable<AidRequest[]>;
  myResponses: any[] = [];
  myResponsesIDs: any[] = [];
  myResponsesList: any[] = [];
  myResponsesLength: number;
  requests: any[] = [];
  messageFlow: Subscription;
  allRequests: Subscription;
  showMessages: boolean = false;
  expandedPanel: number;
  messageMaxLength = 150;
  newMessage: any = {};
  activeThread: Number;
  chat$: object;
  public newMessageForm: FormGroup;

  current_user: User;

  constructor(
    private cdr: ChangeDetectorRef,
    private SidenavService: SidenavService,
    private messageFlowService: MessageFlowService,
    private UserService: UserService,

    private store: Store<fromStore.PlatformState>
  ) {}

  handleShowMessages(id) {
    // this.activeThread = id;
    this.SidenavService.setActiveThread(id);
    this.SidenavService.setOpenChat(true);
    console.log(this);
  }

  sendMessage(fullfilment_id: number, owner: number) {
    this.newMessage.message = this.newMessageForm.controls.messageText.value;
    this.newMessage.fullfilment_id = fullfilment_id;
    this.newMessage.sender_id = this.current_user.id;
    this.newMessage.receiver_id = owner;
    // http://localhost:3000/messages/?text=I want to help&fullfilment_id=1&sender_id=2&receiver_id=1
    this.messageFlowService.sendMessage(this.newMessage);
    this.newMessageForm.reset();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.newMessageForm.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    console.log("open my responses");

    this.newMessageForm = new FormGroup({
      messageText: new FormControl("", [
        Validators.required,
        Validators.maxLength(this.messageMaxLength)
      ])
    });

    let _getChatMessages;

    this.SidenavService.getOpenChat().subscribe(open => {
      console.log("1");

      if (this.activeTab !== 1) return null;
      console.log("2");

      if (open === true) {
        console.log("3");

        this.chat$ = {};

        console.log(this.current_user);

        setTimeout(() => {
          this.store.dispatch(new fromStore.LoadMessages(this.current_user.id));
        }, 0);

        _getChatMessages = this.store
          .select(fromStore.getChatMessages, this.activeThread)
          .subscribe(data => {
            this.chat$ = data;
            console.log("____", this.chat$, data);

            this.SidenavService.setActiveChat(data);
            // this.SidenavService.setActiveThread(this.activeThread);
            setTimeout(() => {}, 0);
          });

        console.log(open, this.activeThread, this.chat$);
      } else {
        if (_getChatMessages) _getChatMessages.unsubscribe();
        console.log(open, this.activeThread, this.chat$);
        return null;
      }

      // this.showMessages = open;
    });
    this.UserService.currentUserSubject.subscribe(data => {
      this.current_user = data;
      console.log(this.current_user);
      if (this.UserService.isLoggedIn) {
        this.myResponses$ = this.store.select(
          fromStore.getUserResponses,
          this.current_user.id
        );

        this.myResponses$.subscribe(data => {
          this.myResponsesLength = data.length;
          console.log(data, data.length, this.myResponsesLength);
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
      // console.log('getActiveSidenavTab', this.activeTab);
    });

    this.messageFlowService.getNewMessage().subscribe(data => {
      let filteredResponses = this.myResponsesList.filter(message => {
        console.log(message);
        return message.id == data.newMessage.fullfilment_id;
      });
      // filteredResponses[0].messages.push(data.newMessage);
      this.myResponsesList[0].messages.concat([data.newMessage]);
      console.log(
        "getNewMessage",
        this,
        data,
        this.myResponsesList,
        filteredResponses[0].messages
      );
    });
  }

  ngOnDestroy() {
    console.log("closing my responses");
  }
}

// PanictUtil.getRequestObservable().subscribe(data => this.requesting = data);

// PanictUtil.getRequestObservable().subscribe(data => setTimeout(() => this.requesting = data, 0));
