import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAxU077IxAHkK25YbCs6rRwwTw7Gx-MHg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
