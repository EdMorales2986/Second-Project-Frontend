import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { IonPopover } from '@ionic/angular/common';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() dataTW: any;
  @ViewChild('popover') popover!: IonPopover;
  @Output() tweetDeleted = new EventEmitter();
  likes: number;
  liked: boolean;
  comments: number;
  user: string = '';

  constructor(private http: HttpClient) {
    this.likes = 0;
    this.comments = 0;
    this.liked = false;
  }

  showOptions(event: any) {
    this.popover.present();
  }

  delete() {
    this.popover.dismiss();
    this.http
      .delete(
        `http://localhost:4000/deleteTweet/${this.user}/${this.dataTW._id}`
      )
      .subscribe({
        next: (value: any) => {
          this.tweetDeleted.emit();
        },
        error: (err: any) => console.log(err),
      });
  }

  like() {
    this.http
      .get(`http://localhost:4000/like/${this.user}/${this.dataTW._id}`)
      .subscribe({
        next: (value: any) => {
          this.liked = value.liked;
          this.http
            .get(`http://localhost:4000/likeCount/${this.dataTW._id}`)
            .subscribe((count: any) => {
              this.likes = count.count;
            });
        },
        error: (err: any) => console.log(err),
      });
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.user = value ?? '';

    this.http
      .get(`http://localhost:4000/likeVerify/${this.user}/${this.dataTW._id}`)
      .subscribe({
        next: (value: any) => {
          this.liked = value.liked;
          this.http
            .get(`http://localhost:4000/likeCount/${this.dataTW._id}`)
            .subscribe({
              next: (count: any) => {
                this.likes = count.count;
                this.http
                  .get(`http://localhost:4000/commentCount/${this.dataTW._id}`)
                  .subscribe((count: any) => {
                    this.comments = count.count;
                  });
              },
            });
        },
      });
  }
}
