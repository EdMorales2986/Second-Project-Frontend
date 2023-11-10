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
import { IonPopover, ModalController } from '@ionic/angular/common';
import { Router } from '@angular/router';
import { ModalEditCommentComponent } from '../modal-edit-comment/modal-edit-comment.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() dataTW: any;
  @ViewChild('popover') popover!: IonPopover;
  @Output() commentDeleted = new EventEmitter();
  @Output() commentEdited = new EventEmitter();
  likes: number;
  liked: boolean;
  user: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController
  ) {
    this.likes = 0;
    this.liked = false;
  }

  showOptions(event: any) {
    this.popover.present();
  }

  delete() {
    this.popover.dismiss();
    this.http
      .delete(
        `https://second-project-backend-production.up.railway.app/deleteComment/${this.user}/${this.dataTW._id}`
      )
      .subscribe({
        next: (value: any) => {
          this.commentDeleted.emit();
        },
        error: (err: any) => console.log(err),
      });
  }

  like() {
    this.http
      .get(
        `https://second-project-backend-production.up.railway.app/commentLike/${this.user}/${this.dataTW._id}`
      )
      .subscribe({
        next: (value: any) => {
          this.liked = value.liked;
          this.http
            .get(
              `https://second-project-backend-production.up.railway.app/commentLikeCount/${this.dataTW._id}`
            )
            .subscribe((count: any) => {
              this.likes = count.count;
            });
        },
        error: (err: any) => console.log(err),
      });
  }

  edit() {
    this.modalController
      .create({
        component: ModalEditCommentComponent,
        componentProps: {
          comment: this.dataTW,
        },
      })
      .then((modalElement) => {
        modalElement.onDidDismiss().then((data) => {
          this.commentEdited.emit();
          this.popover.dismiss();
        });
        modalElement.present();
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
              `https://second-project-backend-production.up.railway.app/commentLikeCount/${this.dataTW._id}`
            )
            .subscribe({
              next: (count: any) => {
                this.likes = count.count;
              },
            });
        },
      });
  }
}
