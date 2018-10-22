import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {ChatService} from './services/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { UsernameDialogComponent } from './dialogs/username-dialog/username-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatFormFieldModule, MatDialogModule, MatInputModule, MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_LABEL_GLOBAL_OPTIONS, MatTabsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupChatTabComponent } from './chat-tabs-container/group-chat-tab/group-chat-tab.component';
import { PrivateChatTabComponent } from './chat-tabs-container/private-chat-tab/private-chat-tab.component';
import { ChatTabsContainerComponent } from './chat-tabs-container/chat-tabs-container.component';



@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    UsernameDialogComponent,
    GroupChatTabComponent,
    PrivateChatTabComponent,
    ChatTabsContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [ChatService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}, {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}],
  bootstrap: [AppComponent],
  entryComponents: [UsernameDialogComponent]
})
export class AppModule { }
