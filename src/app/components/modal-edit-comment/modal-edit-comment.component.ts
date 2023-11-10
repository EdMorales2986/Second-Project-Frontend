import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { ImageStorageService } from 'src/app/services/image-storage.service';

@Component({
  selector: 'app-modal-edit-comment',
  templateUrl: './modal-edit-comment.component.html',
  styleUrls: ['./modal-edit-comment.component.scss'],
})
export class ModalEditCommentComponent implements OnInit {
  desc: string = '';
  url: string = '';
  userName: string;
  // @Output() commentEdited = new EventEmitter();
  @Input() comment: any;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private imageStorageService: ImageStorageService
  ) {
    this.userName = '';
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async onSubmit() {
    const imageURL = await this.imageStorageService.uploadImage();
    this.url = imageURL;
    console.log(this.url);

    this.http
      .put(
        `https://second-project-backend-production.up.railway.app/modifyComment/${this.userName}/${this.comment._id}`,
        {
          desc: this.desc,
          image: this.url,
        }
      )
      .subscribe({
        next: async () => {
          // this.commentEdited.emit();
          this.modalController.dismiss();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.userName = value ?? '';
  }

  openGallery() {
    // this.imageStorageService.logHello();
    this.imageStorageService.openGallery();
  }
}
