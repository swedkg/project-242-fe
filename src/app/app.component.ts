import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../app/_services/sidenav.service';
import { Globals } from '../assets/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private SidenavService: SidenavService // public globals: Globals
  ) {}
  events: string[] = [];
  requestSidenavOpened: boolean = false;
  messagingSidenavOpened: boolean = false;
  current_user = Globals;

  openMessagingSidepanel() {
    console.log('this should open the Messaging Sidepanel ');
  }
  toggleRequestSidenav() {
    this.requestSidenavOpened = !this.requestSidenavOpened;
    this.SidenavService.setRequestSidenavOpened(this.requestSidenavOpened);
  }
  toggleMessagingSidenav() {
    this.messagingSidenavOpened = !this.messagingSidenavOpened;
    this.SidenavService.setMessagingSidenavOpened(this.messagingSidenavOpened);
  }
  ngOnInit(): void {
    this.SidenavService.isRequestSidenavOpened().subscribe(data => {
      this.requestSidenavOpened = data;
    });
    this.SidenavService.isMessagingSidenavOpened().subscribe(data => {
      this.messagingSidenavOpened = data;
    });
  }
}
