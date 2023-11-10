import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ModalCreateTweetComponent } from '../../components/modal-create-tweet/modal-create-tweet.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  tweets = [];
  filter: string;
  user: string;

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {
    (this.filter = 'newFirst'), (this.user = '');
  }

  openModal() {
    this.modalController
      .create({
        component: ModalCreateTweetComponent,
        componentProps: {
          userName: this.user,
        },
      })
      .then((modalElement) => {
        modalElement.onDidDismiss().then((data) => {
          this.handleTweetCreation();
        });
        modalElement.present();
      });
  }

  newest() {
    this.filter = 'newFirst';
    this.http
      .get(
        'https://second-project-backend-production.up.railway.app/showAllTweetsNew'
      )
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  oldest() {
    this.filter = 'oldFirst';
    this.http
      .get(
        'https://second-project-backend-production.up.railway.app/showAllTweetsOld'
      )
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  liked() {
    this.filter = 'liked';
    this.http
      .get(
        `https://second-project-backend-production.up.railway.app/showAllTweetsLiked/${this.user}`
      )
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  followed() {
    this.filter = 'followed';
    this.http
      .get(
        `https://second-project-backend-production.up.railway.app/showAllFollowedTweets/${this.user}`
      )
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      switch (this.filter) {
        case 'newFirst':
          this.newest();
          break;
        case 'oldFirst':
          this.oldest();
          break;
        case 'liked':
          this.liked();
          break;
        case 'followed':
          this.followed();
          break;
      }

      event.target.complete();
    }, 2000);
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.user = value ?? '';

    this.http
      .get(
        'https://second-project-backend-production.up.railway.app/showAllTweetsNew'
      )
      .subscribe({
        next: (tweet: any) => {
          this.tweets = tweet;
        },
        error: (err: any) => console.log(err),
      });
  }

  handleTweetDeletion() {
    this.filter = 'newFirst';
    this.http
      .get(
        'https://second-project-backend-production.up.railway.app/showAllTweetsNew'
      )
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  handleTweetCreation() {
    switch (this.filter) {
      case 'newFirst':
        this.newest();
        break;
      case 'oldFirst':
        this.oldest();
        break;
      case 'liked':
        this.liked();
        break;
      case 'followed':
        this.followed();
        break;
    }
  }
}
