import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AllRequestsComponent } from "../components/all-requests/all-requests.component";
import { SubmitRequestContentComponent } from "../components/submit-request-content/submit-request-content.component";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [AllRequestsComponent, SubmitRequestContentComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [AllRequestsComponent],
  entryComponents: [SubmitRequestContentComponent]
})
export class RequestsModule {}
