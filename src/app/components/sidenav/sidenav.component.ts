import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../_services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(
    private SidenavService: SidenavService // public globals: Globals
  ) {}

  isSidenavOpen: boolean = false;

  toggleRequestSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.SidenavService.setSidenavOpen(this.isSidenavOpen);
  }

  ngOnInit() {}
}
