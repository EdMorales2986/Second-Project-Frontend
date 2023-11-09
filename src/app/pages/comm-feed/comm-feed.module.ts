import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommFeedPageRoutingModule } from './comm-feed-routing.module';

import { CommFeedPage } from './comm-feed.page';

import { CommentComponent } from 'src/app/components/comment/comment.component';

import { ModalCreateCommentComponent } from 'src/app/components/modal-create-comment/modal-create-comment.component';

import { ModalEditCommentComponent } from 'src/app/components/modal-edit-comment/modal-edit-comment.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CommFeedPageRoutingModule],
  declarations: [
    CommFeedPage,
    CommentComponent,
    ModalCreateCommentComponent,
    ModalEditCommentComponent,
  ],
})
export class CommFeedPageModule {}
