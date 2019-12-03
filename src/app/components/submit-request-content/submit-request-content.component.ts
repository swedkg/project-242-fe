import { MapsAPILoader } from "@agm/core";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { UserService } from "../../_services/user.service";

@Component({
  selector: "app-submit-request-content",
  templateUrl: "./submit-request-content.component.html",
  styleUrls: ["./submit-request-content.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SubmitRequestContentComponent implements OnInit {
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<SubmitRequestContentComponent>,
    private store: Store<fromStore.PlatformState>,
    private UserService: UserService
  ) {}
  public newRequestForm: FormGroup;
  // private geoCoder;
  newRequest: any = {};
  reverseResult: any = {};
  current_address: string;

  @ViewChild("autosize")
  autosize: CdkTextareaAutosize;

  @ViewChild("address")
  public searchElementRef: ElementRef;

  closeDialog() {
    this.dialogRef.close();
  }

  addNewRequest() {
    this.newRequest.title = this.newRequestForm.controls.title.value;
    this.newRequest.desc = this.newRequestForm.controls.description.value;
    this.newRequest.isOneTime = this.newRequestForm.controls.isOneTime.value;
    this.newRequest.address = this.current_address;
    this.newRequest.status = true;
    // this.newRequest.isUser = false;
    this.newRequest.owner_id = this.UserService.currentUserDetails.id;

    this.store.dispatch(new fromStore.CreateRequest(this.newRequest));
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
      title: new FormControl("", [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.maxLength(300)
      ]),
      address: new FormControl(
        "",
        [Validators.required, this.validateAddress.bind(this)],
        []
      ),
      isOneTime: new FormControl("", [Validators.required])
    });

    this.mapsAPILoader.load().then(() => {
      // console.log('mapsAPILoader loaded');
      // this.setCurrentLocation();
      // this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
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
