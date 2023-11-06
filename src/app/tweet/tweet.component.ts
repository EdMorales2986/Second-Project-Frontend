import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() dataTW: any;
  likes: number;
  comments: number;

  constructor(private http: HttpClient) {
    this.likes = 0;
    this.comments = 0;
  }

  ngOnInit() {
    this.http
      .get(`http://localhost:4000/likeCount/${this.dataTW._id}`)
      .subscribe((count: any) => {
        this.likes = count.count;
      });

    this.http
      .get(`http://localhost:4000/commentCount/${this.dataTW._id}`)
      .subscribe((count: any) => {
        this.comments = count.count;
      });
  }
}
