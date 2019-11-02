import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Globals } from '../../../assets/globals';
import { Message } from '../../models/message.model';
import * as fromStore from '../../store';
import { MessageFlowService } from '../../_services/message-flow.service';
import { SidenavService } from '../../_services/sidenav.service';

import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { AidRequest } from '../../models/aidRequest.model';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-responses',
  templateUrl: './my-responses.component.html',
  styleUrls: ['./my-responses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyResponsesComponent implements OnInit {
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
  current_user = Globals.id;
  expanded = 0;
  messageMaxLength = 150;
  newMessage: any = {};
  activeThread: Number;
  chat$: object;
  public newMessageForm: FormGroup;
  activeMessagingTab: number;
  constructor(
    private cdr: ChangeDetectorRef,
    private sidenavService: SidenavService,
    private messageFlowService: MessageFlowService,
    private store: Store<fromStore.PlatformState> // public globals: Globals
  ) {}

  handleShowMessages(id) {
    this.activeThread = id;
    this.sidenavService.setOpenChat(true);
    console.log(this);
  }

  sendMessage(fullfilment_id: number, owner: number) {
    this.newMessage.message = this.newMessageForm.controls.messageText.value;
    this.newMessage.fullfilment_id = fullfilment_id;
    this.newMessage.sender_id = this.current_user;
    this.newMessage.receiver_id = owner;
    // http://localhost:3000/messages/?text=I want to help&fullfilment_id=1&sender_id=2&receiver_id=1
    this.messageFlowService.sendMessage(this.newMessage);
    this.newMessageForm.reset();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.newMessageForm.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    this.newMessageForm = new FormGroup({
      messageText: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.messageMaxLength)
      ])
    });

    this.sidenavService.getOpenChat().subscribe(open => {
      if (this.activeMessagingTab !== 0) return null;
      this.store.dispatch(new fromStore.LoadMessages(this.current_user));

      this.store
        .select(fromStore.getChatMessages, this.activeThread)
        .subscribe(data => {
          this.chat$ = data;
        });

      console.log(open, this.activeThread, this.chat$);
      this.showMessages = open;
      console.log('--------------------------------------------------');
    });

    this.myResponses$ = this.store.select(fromStore.getUserResponses);

    this.myResponses$.subscribe(data => {
      this.myResponsesLength = data.length;
      console.log(data, data.length, this.myResponsesLength);
    });

    this.messageFlowService.getNewMessage().subscribe(data => {
      let filteredResponses = this.myResponsesList.filter(message => {
        console.log(message);
        return message.id == data.newMessage.fullfilment_id;
      });
      // filteredResponses[0].messages.push(data.newMessage);
      this.myResponsesList[0].messages.concat([data.newMessage]);
      console.log(
        'getNewMessage',
        this,
        data,
        this.myResponsesList,
        filteredResponses[0].messages
      );
    });
  }
}

// PanictUtil.getRequestObservable().subscribe(data => this.requesting = data);

// PanictUtil.getRequestObservable().subscribe(data => setTimeout(() => this.requesting = data, 0));
