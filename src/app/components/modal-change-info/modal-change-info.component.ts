import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-modal-change-info',
  templateUrl: './modal-change-info.component.html',
  styleUrls: ['./modal-change-info.component.scss'],
})
export class ModalChangeInfoComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private alertController: AlertController
  ) {}
  password: string = '';
  email: string = '';
  name: string = '';
  lastname: string = '';
  bios: string = '';
  oldPassword: string = '';
  sending: boolean = false;

  @Input() userName!: string;

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.sending = true;
    this.http
      .put(
        `https://second-project-backend-production.up.railway.app/${this.userName}/update`,
        {
          name: this.name,
          lname: this.lastname,
          email: this.email,
          oldPass: this.oldPassword,
          newPass: this.password,
          bios: this.bios,
        }
      )
      .subscribe({
        next: async () => {
          await Preferences.remove({ key: 'jwt' });
          await Preferences.remove({ key: 'alias' });
          await Preferences.clear();
          this.modalController.dismiss();
          this.router.navigate(['/']).then(() => {
            location.reload();
          });
        },
        error: (error) => {
          const alert = this.alertController
            .create({
              header: 'ERROR',
              message: error.error.msg,
              buttons: ['Dismiss'],
            })
            .then((alert) => {
              alert.present();
            });
        },
      });
  }

  ngOnInit() {}
}
