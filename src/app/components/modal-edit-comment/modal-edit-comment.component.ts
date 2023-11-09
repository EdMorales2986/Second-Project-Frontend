import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

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
    private location: Location
  ) {
    this.userName = '';
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.http
      .put(
        `http://localhost:4000/modifyComment/${this.userName}/${this.comment._id}`,
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
}
