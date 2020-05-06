import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChatComponent } from "../components/chat/chat.component";
import { NotificationsComponent } from "../components/notifications/notifications.component";
import { UserPanelComponent } from "../components/user-panel/user-panel.component";
import { RelativeTimePipe } from "../pipes/relative-time.pipe";
import { MaterialModule } from "./material.module";
import { RequestsModule } from "./requests.module";
import { ResponsesModule } from "./responses.module";

@NgModule({
  declarations: [
    ChatComponent,
    UserPanelComponent,
    RelativeTimePipe,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    RequestsModule,
    ResponsesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RequestsModule,
    ResponsesModule,
    ChatComponent,
    UserPanelComponent,
    RelativeTimePipe,
    NotificationsComponent,
  ],
})
export class SidenavModule {}
