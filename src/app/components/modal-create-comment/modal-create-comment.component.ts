import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { ImageStorageService } from 'src/app/services/image-storage.service';

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
    private location: Location,
    private imageStorageService: ImageStorageService
  ) {}

  desc: string = '';
  url: string = '';
  sending: boolean = false;
  @Input() userName!: string;
  @Input() fatherTweet!: string;

  dismissModal() {
    this.modalController.dismiss();
  }

  async onSubmit() {
    this.sending = true;
    const imageURL = await this.imageStorageService.uploadImage();
    this.url = imageURL;
    console.log(this.url);

    this.http
      .post(
        `https://second-project-backend-production.up.railway.app/createComment/${this.userName}/${this.fatherTweet}`,
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

  openGallery() {
    // this.imageStorageService.logHello();
    this.imageStorageService.openGallery();
  }
}
