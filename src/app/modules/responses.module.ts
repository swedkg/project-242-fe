import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyRequestsComponent } from "../components/my-requests/my-requests.component";
import { MyResponsesComponent } from "../components/my-responses/my-responses.component";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [MyResponsesComponent, MyRequestsComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MyResponsesComponent, MyRequestsComponent]
})
export class ResponsesModule {}
