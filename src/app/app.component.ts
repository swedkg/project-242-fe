import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  events: string[] = [];
  requestSidenavOpened: boolean;
  messagingSidenavOpened: boolean;

  openMessagingSidepanel() {
    console.log('this should open the Messaging Sidepanel ');
  }
}
