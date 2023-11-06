import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  tweets = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://localhost:4000/showAllTweetsNew')
      .subscribe((tweet: any) => {
        this.tweets = tweet;
      });
  }
}
