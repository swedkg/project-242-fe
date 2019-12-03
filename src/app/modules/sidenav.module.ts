import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChatComponent } from "../components/chat/chat.component";
import { UserPanelComponent } from "../components/user-panel/user-panel.component";
import { MaterialModule } from "./material.module";
import { RequestsModule } from "./requests.module";
import { ResponsesModule } from "./responses.module";

@NgModule({
  declarations: [ChatComponent, UserPanelComponent],
  imports: [
    CommonModule,
    RequestsModule,
    ResponsesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RequestsModule, ResponsesModule, ChatComponent, UserPanelComponent]
})
export class SidenavModule {}
