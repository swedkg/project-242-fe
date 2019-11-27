import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChatComponent } from "../components/chat/chat.component";
import { MaterialModule } from "./material.module";
import { RequestsModule } from "./requests.module";
import { ResponsesModule } from "./responses.module";

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RequestsModule,
    ResponsesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RequestsModule, ResponsesModule, ChatComponent]
})
export class SidenavModule {}
