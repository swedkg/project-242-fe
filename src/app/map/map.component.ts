import { NgModule, Component, OnInit } from '@angular/core';
import { HelpRequestsService } from '../help-requests.service';
@NgModule({
  providers: [HelpRequestsService]
})
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor(private HelpRequestsService: HelpRequestsService) {}

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  ngOnInit() {
    this.HelpRequestsService.getHelpRequests().subscribe(data => {
      // this.markers = data;
      console.log(data);
    });
    console.log(this.HelpRequestsService.getHelpRequests());
  }
}
