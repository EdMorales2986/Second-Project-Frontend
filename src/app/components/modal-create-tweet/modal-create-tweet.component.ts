import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { ImageStorageService } from 'src/app/services/image-storage.service';

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
    private imageStorageService: ImageStorageService
  ) {}

  desc: string = '';
  url: string = '';
  sending: boolean = false;
  selectedImage: string[] = [];
  @Input() userName!: string;

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
        `https://second-project-backend-production.up.railway.app/createTweet/${this.userName}`,
        {
          desc: this.desc,
          image: this.url,
        }
      )
      .subscribe({
        next: async () => {
          // this.sending = false;
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
    this.imageStorageService.openGallery().then(() => {
      this.selectedImage = this.imageStorageService.selectedImages;
    });
  }
}
