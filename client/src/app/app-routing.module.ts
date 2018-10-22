
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupChatTabComponent} from "./chat-tabs-container/group-chat-tab/group-chat-tab.component";
import {PrivateChatTabComponent} from "./chat-tabs-container/private-chat-tab/private-chat-tab.component";
import {ChatTabsContainerComponent} from "./chat-tabs-container/chat-tabs-container.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'chats',
    pathMatch: 'full'
  },

  {
    path: 'chats',
    component: ChatTabsContainerComponent,
    children: [

      {
        path: 'group-chat',
        component: GroupChatTabComponent
      },
      {
        path: ':username',
        component: PrivateChatTabComponent
      }

    ]


  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
