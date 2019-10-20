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

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-my-responses',
  templateUrl: './my-responses.component.html',
  styleUrls: ['./my-responses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyResponsesComponent implements OnInit {
  myResponses$: Observable<Message>;
  allResponses: any[] = [];
  myResponses: any[] = [];
  myResponsesIDs: any[] = [];
  myResponsesList: any[] = [];
  requests: any[] = [];
  messageFlow: Subscription;
  allRequests: Subscription;
  showMessages: boolean = false;
  current_user = Globals.id;
  expanded = 0;
  messageMaxLength = 150;
  newMessage: any = {};
  public newMessageForm: FormGroup;
  constructor(
    private cdr: ChangeDetectorRef,
    private sidenavService: SidenavService,
    private messageFlowService: MessageFlowService,
    private store: Store<fromStore.PlatformState> // public globals: Globals
  ) {}

  buildMyResponsesList() {
    // if (this.myResponses.length * this.requests.length == 0) return null;
    this.myResponsesList = [];
    return false;
    this.myResponsesList = this.myResponses.map(item => ({
      ...item,
      selected: false
    }));

    // setTimeout(() => {
    //   // console.log(this.myResponsesList, this.myResponses);
    // }, 0);
  }

  handleShowMessages() {
    this.showMessages = !this.showMessages;
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

    // this.store.dispatch(new fromStore.LoadRequests());
    // this.store.dispatch(new fromStore.LoadMyResponses(this.current_user));

    this.sidenavService.getExpanded().subscribe(data => {
      this.expanded = data;
      console.log(data);
      this.store.dispatch(new fromStore.LoadMessages(this.current_user));
      this.showMessages = true;
    });

    // });
    this.store.dispatch(new fromStore.LoadMessages(this.current_user));
    this.store.select(fromStore.getMessages).subscribe(
      state => {
        this.myResponses = state;
        // this.myResponsesList = this.myResponses;
        this.myResponsesList = [];
        this.myResponsesList = this.myResponses.map(item => ({
          ...item,
          selected: false
        }));
        console.log(this.myResponses, this.myResponsesList);
        this.cdr.detectChanges();

        // this.buildMyResponsesList();
      }

      // this.myResponses = state.filter(m => {
      //   return m.requester_id != m.user_id;
      // });
      // if (this.myResponses.length > 0 && this.requests.length > 0)
      // console.log(state, this.myResponses);
    );

    this.messageFlowService.getNewMessage().subscribe(data => {
      // let newRequest = data.request;
      // this.markers.push(newRequest);

      // this.store.dispatch(new fromStore.LoadMyResponses(this.current_user));

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
