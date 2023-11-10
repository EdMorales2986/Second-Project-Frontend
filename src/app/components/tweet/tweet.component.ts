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
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {
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
        `https://second-project-backend-production.up.railway.app/deleteTweet/${this.user}/${this.dataTW._id}`
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
      .get(
        `https://second-project-backend-production.up.railway.app/like/${this.user}/${this.dataTW._id}`
      )
      .subscribe({
        next: (value: any) => {
          this.liked = value.liked;
          this.http
            .get(
              `https://second-project-backend-production.up.railway.app/likeCount/${this.dataTW._id}`
            )
            .subscribe((count: any) => {
              this.likes = count.count;
            });
        },
        error: (err: any) => console.log(err),
      });
  }

  comment() {
    this.router.navigate(['/comm-feed'], {
      queryParams: { id: this.dataTW._id, user: this.user },
    });
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.user = value ?? '';

    this.http
      .get(
        `https://second-project-backend-production.up.railway.app/likeVerify/${this.user}/${this.dataTW._id}`
      )
      .subscribe({
        next: (value: any) => {
          this.liked = value.liked;
          this.http
            .get(
              `https://second-project-backend-production.up.railway.app/likeCount/${this.dataTW._id}`
            )
            .subscribe({
              next: (count: any) => {
                this.likes = count.count;
                this.http
                  .get(
                    `https://second-project-backend-production.up.railway.app/commentCount/${this.dataTW._id}`
                  )
                  .subscribe((count: any) => {
                    this.comments = count.count;
                  });
              },
            });
        },
      });
  }
}
