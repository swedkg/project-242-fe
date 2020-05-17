import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromStore from "../../store";
import * as messagesActions from "../../store/actions/messages.actions";
import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";
import { WebsocketsService } from "../../_services/websockets.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {
  public newMessageForm: FormGroup;
  messageMinLength = 3;
  messageMaxLength = 150;
  newMessage: any = {};
  chatMessages$: any;
  chatMessages: {};
  chatRequest: any = {};
  current_user: any = {};
  fullfilment_id: number;
  chatMembers: any = [];
  isMessageFormDisabled: boolean = false;

  // _getActiveChat;
  _getActiveThread;
  _chatRequest;
  _getChatMessages;

  messageFormReset: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,

    private SidenavService: SidenavService,
    private store: Store<fromStore.PlatformState>,
    private UserService: UserService,
    private WebsocketsService: WebsocketsService,
    private actionsSubj: ActionsSubject
  ) {
    this.messageFormReset = this.actionsSubj
      .pipe(ofType(messagesActions.CREATE_MESSAGE_SUCCESS))
      .subscribe((data) => {
        this.newMessage = {};
        this.newMessageForm.reset();
      });
  }

  // @Input() request_id: number;
  request_id: number;
  @Input() responder_id: number;
  @Input() showMessages: boolean;
  // @Input() chat$: any;
  chat$: any;
  activeTab;

  sendMessage() {
    if (!this.newMessageForm.valid) return null;

    this.newMessage.message = this.newMessageForm.controls.messageText.value;
    this.newMessage.fullfilment_id = this.fullfilment_id;
    this.newMessage.sender_id = this.current_user.id;
    this.newMessage.request_id = this.request_id;

    this.newMessage.users = {};

    switch (this.activeTab) {
      case this.SidenavService.tabs.myResponses: {
        this.newMessage.receiver_id = this.chatRequest.owner_id;
        this.newMessage.users.receiver = this.chatMembers.receiver;
        this.newMessage.users.sender = this.chatMembers.sender;
        break;
      }
      case this.SidenavService.tabs.myRequests: {
        this.newMessage.receiver_id = this.chatMembers.sender.id;
        this.newMessage.users.receiver = this.chatMembers.sender;
        this.newMessage.users.sender = this.chatMembers.receiver;
        break;
      }
    }

    this.store.dispatch(new fromStore.CreateMessage(this.newMessage));

    this.scrollMessageFLowContainer();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.newMessageForm.controls[controlName].hasError(errorName);
  };

  // scroll element to bottom
  scrollMessageFLowContainer() {
    let el = document.querySelector(".message-flow-container");
    if (el === null) return false;
    el.scrollTo({
      left: 0,
      top: el.scrollHeight,
      behavior: "smooth",
    });
    // el.scrollTop = el.scrollHeight;
  }

  resetChat() {
    this.newMessageForm.reset();
  }

  closeChat() {
    this.SidenavService.setOpenChat(false);
    this.showMessages = false;
  }

  ngOnInit() {
    console.log("chat init");

    this.UserService.currentUserSubject.subscribe((data) => {
      this.current_user = data;
    });

    this.newMessageForm = new FormGroup({
      messageText: new FormControl("", [
        Validators.required,
        Validators.minLength(this.messageMinLength),
        Validators.maxLength(this.messageMaxLength),
      ]),
    });

    // this.request_id = this.SidenavService.thread;

    this.SidenavService.getOpenChat().subscribe((data) => {
      this.showMessages = data;
      // if (this.current_user == null) {
      //   this.store.dispatch(new fromStore.RemoveAllMessages());
      //   this.store.dispatch(new fromStore.RemoveAllRequests());
      // }
    });

    this._getActiveThread = this.SidenavService.getActiveThread().subscribe(
      (request_id) => {
        // this.activeThread = data;
        // this.SidenavService.setOpenChat(true);
        this.request_id = request_id;

        this._getChatMessages = this.store
          .select(fromStore.getChatMessages, this.request_id)
          .subscribe((data) => {
            if (data.length == 0) {
              this.isMessageFormDisabled = true;
              this.newMessageForm.disable();
              return null;
            } else {
              this.chatMessages$ = data;
              this.fullfilment_id = this.chatMessages$[0].fullfilment_id;
              this.chatMembers = this.chatMessages$[0].users;

              this.chatMessages$.forEach((message) => {
                if (
                  (message.status == 0 || message.status == 1) &&
                  message.receiver_id == this.current_user.id
                ) {
                  console.log(
                    "mark as read",
                    message,
                    message.receiver_id == this.current_user.id
                  );
                  // change status -> 2 and update the store
                  this.store.dispatch(
                    new fromStore.MessageDisplayed(message.id)
                  );

                  // send websocket to the sender_id
                  setTimeout(
                    function () {
                      this.WebsocketsService.messagingChannelMessageDisplayed(
                        message.id
                      );
                    }.bind(this),
                    1000
                  );
                }
              });
            }

            setTimeout(this.scrollMessageFLowContainer, 100);

            console.log("chatMessage$", data);
          });

        this._chatRequest = this.store
          .select(fromStore.getSingleRequest, this.request_id)
          .subscribe((chatRequest: any) => {
            this.chatRequest = chatRequest[0];
            console.log(
              "fromStore.getSingleRequest",
              this.request_id,
              this.chatRequest
            );
          });
        console.log("Chat chatRequest", request_id);
      }
    );

    this.SidenavService.getActiveSidenavTab().subscribe((data) => {
      this.activeTab = data;
    });

    console.log(this);
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    // if (this._getActiveChat) this._getActiveChat.unsubscribe();
    if (this._getActiveThread) this._getActiveThread.unsubscribe();
    if (this._chatRequest) this._chatRequest.unsubscribe();
    if (this._getChatMessages) this._getChatMessages.unsubscribe();
    // if (this._getActiveSidenavTab) this._getActiveSidenavTab.unsubscribe();
    // console.clear();
    console.log("closing chat");
  }
}
