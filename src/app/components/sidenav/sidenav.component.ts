import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SidenavService } from '../../_services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  activeTab: number = 0;

  constructor(
    private SidenavService: SidenavService // public globals: Globals
  ) {}

  isSidenavOpen: boolean = false;

  toggleRequestSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.SidenavService.setSidenavOpen(this.isSidenavOpen);
  }

  indexChanged(event) {
    this.activeTab = event;
    this.SidenavService.setActiveSidenavTab(event);
  }

  ngOnInit() {
    this.SidenavService.getActiveSidenavTab().subscribe(data => {
      this.activeTab = data;
      console.log(data, this);
    });
  }
}
