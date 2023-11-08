import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  tweets = [];
  filter: string;
  user: string;

  constructor(private http: HttpClient) {
    (this.filter = 'newFirst'), (this.user = '');
  }

  newest() {
    this.filter = 'newFirst';
    this.http
      .get('http://localhost:4000/showAllTweetsNew')
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  oldest() {
    this.filter = 'oldFirst';
    this.http
      .get('http://localhost:4000/showAllTweetsOld')
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  liked() {
    this.filter = 'liked';
    this.http
      .get(`http://localhost:4000/showAllTweetsLiked/${this.user}`)
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  followed() {
    this.filter = 'followed';
    this.http
      .get(`http://localhost:4000/showAllFollowedTweets/${this.user}`)
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      switch (this.filter) {
        case 'newFirst':
          this.http
            .get('http://localhost:4000/showAllTweetsNew')
            .subscribe((tweet: any) => {
              this.tweets = tweet;
            });
          break;
        case 'oldFirst':
          this.http
            .get('http://localhost:4000/showAllTweetsOld')
            .subscribe((tweet: any) => {
              this.tweets = tweet;
            });
          break;
        case 'liked':
          this.http
            .get(`http://localhost:4000/showAllTweetsLiked/${this.user}`)
            .subscribe((tweet: any) => {
              this.tweets = tweet;
            });
          break;
        case 'followed':
          this.http
            .get(`http://localhost:4000/showAllFollowedTweets/${this.user}`)
            .subscribe((tweet: any) => {
              this.tweets = tweet;
            });
      }

      event.target.complete();
    }, 2000);
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.user = value ?? '';

    this.http
      .get('http://localhost:4000/showAllTweetsNew')
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  handleTweetDeletion() {
    this.filter = 'newFirst';
    this.http
      .get('http://localhost:4000/showAllTweetsNew')
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }

  handleTweetEdit() {
    this.filter = 'newFirst';
    this.http
      .get('http://localhost:4000/showAllTweetsNew')
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }
}
