import { AgmMap } from '@agm/core';
import {
  Component,
  NgModule,
  OnInit,
  ViewChild,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import { HelpRequestsService } from '../_services/help-requests.service';

@NgModule({
  providers: [HelpRequestsService]
})
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  constructor(private helpRequestsService: HelpRequestsService) {}

  public markers; //: {} = [];

  @ViewChild(AgmMap)
  public agmMap: AgmMap;

  @HostListener('window:resize')
  onWindowResize() {
    // console.log('resize');
    // console.log(this);

    this.agmMap.triggerResize();
  }

  sendInboundRequestList(message): void {
    // send message to subscribers via observable subject
    // console.log(message);
    this.helpRequestsService.sendInboundRequestList(message);
  }

  sendRequestList(message): void {
    // send message to subscribers via observable subject
    // console.log(message);
    this.helpRequestsService.sendRequestList(message);
  }

  checkMarkersInBounds(event) {
    // console.clear();
    let counter = 0;
    let inBoundMarkers = [];
    let mapBounds = event.toJSON();
    // console.log(event, mapBounds);
    this.markers.forEach(el => {
      let position = { lat: el.lat, lng: el.lng };
      if (this.inRange(position.lng, mapBounds.west, mapBounds.east)) {
        if (this.inRange(position.lat, mapBounds.south, mapBounds.north)) {
          counter++; // console.log(el);
          inBoundMarkers.push(el);
        }
      }
    });
    // console.log(counter + ' in bounds markers');
    this.sendInboundRequestList(inBoundMarkers);
  }

  inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
  }

  addMarker(event) {
    console.log('another marker added', event);
  }

  addUserLocation(position) {
    let coords = position.coords;
    // console.log('navigator.geolocation exists', coords, this);
    this.markers.push({
      lat: coords.latitude,
      lng: coords.longitude,
      title: 'You are here',
      isUser: true
    });
  }

  ngOnInit() {
    // let self = this;
    this.helpRequestsService.getAllRequestsFromJSON().subscribe(data => {
      this.markers = data;
      this.markers = this.markers.filter(el => el.fulfilled === false);

      if (!!navigator.geolocation) {
        // Support
        navigator.geolocation.getCurrentPosition(
          this.addUserLocation.bind(this)
        );
      } else {
        // No support
      }
    });

    this.helpRequestsService.getNewRequest().subscribe(data => {
      let newRequest = data.request;
      this.markers.push(newRequest);
      console.log('getNewRequest', this);
      this.sendRequestList(this.markers);
    });
  }
}
