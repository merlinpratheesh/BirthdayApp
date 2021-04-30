import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AudioRecordingService } from './audio-recording.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoRecordingService } from './video-recording.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AudioRecordingService,VideoRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
