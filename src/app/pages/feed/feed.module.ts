import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedPageRoutingModule } from './feed-routing.module';
import { FeedPage } from './feed.page';
import { TweetComponent } from '../../components/tweet/tweet.component';
import { ModalCreateTweetComponent } from '../../components/modal-create-tweet/modal-create-tweet.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedPageRoutingModule],
  declarations: [FeedPage, TweetComponent, ModalCreateTweetComponent],
})
export class FeedPageModule {}
