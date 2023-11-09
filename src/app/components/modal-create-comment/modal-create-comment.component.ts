import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-modal-create-comment',
  templateUrl: './modal-create-comment.component.html',
  styleUrls: ['./modal-create-comment.component.scss'],
})
export class ModalCreateCommentComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  desc: string = '';
  url: string = '';
  @Input() userName!: string;
  @Input() fatherTweet!: string;

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.http
      .post(
        `http://localhost:4000/createComment/${this.userName}/${this.fatherTweet}`,
        {
          desc: this.desc,
          image: this.url,
        }
      )
      .subscribe({
        next: async () => {
          this.modalController.dismiss();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit() {}
}
