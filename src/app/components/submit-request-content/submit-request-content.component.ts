import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MapsAPILoader } from '@agm/core';
import { HelpRequestsService } from '../../_services/help-requests.service';
import { MatDialogRef } from '@angular/material';

import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-submit-request-content',
  templateUrl: './submit-request-content.component.html',
  styleUrls: ['./submit-request-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmitRequestContentComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private helpRequestsService: HelpRequestsService,
    public dialogRef: MatDialogRef<SubmitRequestContentComponent> // public globals: Globals
  ) {}
  public newRequestForm: FormGroup;
  // private geoCoder;
  newRequest: any = {};
  reverseResult: any = {};
  current_address: string;

  @ViewChild('autosize')
  autosize: CdkTextareaAutosize;

  @ViewChild('address')
  public searchElementRef: ElementRef;

  closeDialog() {
    this.dialogRef.close();
  }

  addNewRequest() {
    this.newRequest.title = this.newRequestForm.controls.title.value;
    this.newRequest.desc = this.newRequestForm.controls.description.value;
    this.newRequest.isOneTime = this.newRequestForm.controls.isOneTime.value;
    this.newRequest.status = false;
    // this.newRequest.isUser = false;
    this.newRequest.owner_id = Globals.id;

    // console.log(
    //   'addNewRequest',
    //   this.newRequest,
    //   this.newRequestForm.controls.title
    // );
    let kk = this.helpRequestsService.addNewRequest(this.newRequest);
    console.log(kk);

    this.closeDialog();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.newRequestForm.controls[controlName].hasError(errorName);
  };

  validateAddress() {
    // console.log(
    //   'current:',
    //   this.current_address,
    //   'native:',
    //   this.searchElementRef.nativeElement.value
    // );

    if (this.current_address !== this.searchElementRef.nativeElement.value) {
      return { validateAddress: true };
    }
    return null;
  }

  ngOnInit() {
    console.log(this);

    this.newRequestForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(300)
      ]),
      address: new FormControl(
        '',
        [Validators.required, this.validateAddress.bind(this)],
        []
      ),
      isOneTime: new FormControl('', [Validators.required])
    });

    this.mapsAPILoader.load().then(() => {
      // console.log('mapsAPILoader loaded');
      // this.setCurrentLocation();
      // this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let reverseResult: google.maps.places.PlaceResult = autocomplete.getPlace();

          // console.log(reverseResult);

          //verify result
          if (
            reverseResult.geometry === undefined ||
            reverseResult.geometry === null
          ) {
            return;
          }

          this.reverseResult = reverseResult;

          //set latitude, longitude and zoom
          this.newRequest.lat = reverseResult.geometry.location.lat();
          this.newRequest.lng = reverseResult.geometry.location.lng();
          // this.newRequest.title = 'New request title';
          // this.newRequest.description = 'Some description here';

          this.current_address = this.searchElementRef.nativeElement.value;

          this.newRequestForm.controls.address.updateValueAndValidity();

          // console.log(
          //   this.newRequest,
          //   this.newRequestForm.controls.address,
          //   reverseResult,
          //   this.searchElementRef.nativeElement.value
          // );

          // this.addressHasError = false;

          // console.log(
          //   this.searchElementRef.nativeElement.value,
          //   this.searchElementRef.nativeElement.value === this.current_address
          // );

          // this.zoom = 16;
        });
      });
    });
  }
}
