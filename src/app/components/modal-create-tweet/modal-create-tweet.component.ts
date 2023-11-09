import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-modal-create-tweet',
  templateUrl: './modal-create-tweet.component.html',
  styleUrls: ['./modal-create-tweet.component.scss'],
})
export class ModalCreateTweetComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  desc: string = '';
  url: string = '';
  @Input() userName!: string;

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.http
      .post(`http://localhost:4000/createTweet/${this.userName}`, {
        desc: this.desc,
        image: this.url,
      })
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
