import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ChatService} from './services/chat.service';
import {HttpClient} from '@angular/common/http';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { UsernameDialogComponent } from './dialogs/username-dialog/username-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatFormFieldModule, MatDialogModule, MatInputModule, MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_LABEL_GLOBAL_OPTIONS
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    UsernameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [ChatService, HttpClient, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}, {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}],
  bootstrap: [AppComponent],
  entryComponents: [UsernameDialogComponent]
})
export class AppModule { }
