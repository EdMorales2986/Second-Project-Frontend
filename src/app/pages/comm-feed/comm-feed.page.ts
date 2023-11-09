import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ModalCreateCommentComponent } from 'src/app/components/modal-create-comment/modal-create-comment.component';

@Component({
  selector: 'app-comm-feed',
  templateUrl: './comm-feed.page.html',
  styleUrls: ['./comm-feed.page.scss'],
})
export class CommFeedPage implements OnInit {
  comments = [];
  fatherTweet: string;
  user: string;

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private route: ActivatedRoute
  ) {
    this.fatherTweet = '';
    this.user = '';
  }

  openModal() {
    this.modalController
      .create({
        component: ModalCreateCommentComponent,
        componentProps: {
          userName: this.user,
          fatherTweet: this.fatherTweet,
        },
      })
      .then((modalElement) => {
        modalElement.onDidDismiss().then((data) => {
          this.getComments();
        });
        modalElement.present();
      });
  }

  getComments() {
    this.http
      .get(`http://localhost:4000/showAllComments/${this.fatherTweet}`)
      .subscribe((comment: any) => {
        this.comments = comment;
      });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.getComments();
      event.target.complete();
    }, 2000);
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const { id, user } = params;
      this.fatherTweet = id;
      this.user = user;
    });

    await this.getComments();
  }
}
