import { AgmMap } from "@agm/core";
import {
  Component,
  HostListener,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { HelpRequestsService } from "../../_services/help-requests.service";
import { SidenavService } from "../../_services/sidenav.service";
import { mapStyle } from "./mapStyle";

@NgModule({
  providers: [HelpRequestsService, SidenavService]
})
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  constructor(
    private helpRequestsService: HelpRequestsService,
    private SidenavService: SidenavService,
    private store: Store<fromStore.PlatformState>
  ) {}

  public initialZoomLevel = 12;
  public userPosition: object = {};
  public fitBounds: boolean = false;
  public markers; //: {} = [];
  public mapStyle = mapStyle;

  @ViewChild(AgmMap)
  public agmMap: AgmMap;

  @HostListener("window:resize")
  onWindowResize() {
    // console.log("resize");
    // console.log(this);

    this.fitBounds = true;
    this.agmMap.triggerResize();
  }

  inBoundMarkersList(message): void {
    // send message to subscribers via observable subject
    console.log(message);
    this.helpRequestsService.inBoundMarkersList(message);
  }

  checkMarkersInBounds(event) {
    // console.clear();
    let counter = 0;
    let inBoundMarkers = [];
    let mapBounds = event.toJSON();
    // console.log(event, mapBounds, this);
    // console.log(this.markers);

    if (this.markers)
      this.markers.forEach(el => {
        let position = { lat: el.lat, lng: el.lng };
        if (this.inRange(position.lng, mapBounds.west, mapBounds.east)) {
          if (this.inRange(position.lat, mapBounds.south, mapBounds.north)) {
            counter++; // console.log(el);
            // TODO: we need to annouce that so the side panel will be updated

            // console.log(el);
            inBoundMarkers.push(el);
          }
        }
      });
    this.inBoundMarkersList(inBoundMarkers);
  }

  inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
  }

  addMarker(event) {
    console.log("another marker added", event);
  }

  addUserLocation(position) {
    let coords = position.coords;
    this.userPosition = coords;
    // console.log("navigator.geolocation exists", coords, this);
    this.markers = this.markers.filter(function(m) {
      // console.log(m);
      return m.republised === 1;
    });
    this.markers.push({
      lat: coords.latitude,
      lng: coords.longitude,
      title: "You are here",
      isUser: true
    });
    // console.log(this.markers);
  }

  respondToRequest(id) {
    this.SidenavService.setExpandedAccordionPanel(id);
    this.SidenavService.setSidenavOpen(false);
    // this.SidenavService.setMessagingSidenavOpened(true);
    this.SidenavService.setActiveSidenavTab(0);
  }

  // TODO: sign-in/ signup
  // TODO: wireframes, at leasts 5, desktop and mobile
  // TODO: markers of separate colors
  // TODO: unlist after 24 hours, add republish button
  // TODO: backed testing, unit tests for models and controler tests
  // TODO: click on marker, displays info, status, button to fullfil
  // TODO: if >5 users = fulfilled, cannot republish
  // TODO: add the number of fullfiled requests

  ngOnInit() {
    // let self = this;
    this.store.dispatch(new fromStore.LoadRequests());
    this.store.select(fromStore.getAllRequests).subscribe(data => {
      this.markers = data;

      if (!!navigator.geolocation) {
        // Support
        navigator.geolocation.getCurrentPosition(
          this.addUserLocation.bind(this)
        );
      } else {
        // No support
      }
    });
  }
}
