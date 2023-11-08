import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { ModalChangeInfoComponent } from '../modal-change-info/modal-change-info.component';
import { ModalDeleteAccountComponent } from '../modal-delete-account/modal-delete-account.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userData: object;
  alias: string;
  bio: string;
  followers: number;
  img: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private modalController: ModalController
  ) {
    this.userData = {};
    this.alias = '';
    this.bio = '';
    this.followers = 0;
    this.img = '';
  }

  async logout() {
    await Preferences.remove({ key: 'jwt' });
    await Preferences.remove({ key: 'alias' });
    this.router.navigate(['/']);
  }

  async changeInfo() {
    const modal = await this.modalController.create({
      component: ModalChangeInfoComponent,
      componentProps: {
        userName: this.alias,
      },
    });
    modal.present();
  }

  async deleteAccount() {
    const modal = await this.modalController.create({
      component: ModalDeleteAccountComponent,
      componentProps: {
        userName: this.alias,
      },
    });
    modal.present();
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.http
      .post('http://localhost:4000/search', { query: `${value}` })
      .subscribe({
        next: (response: any) => {
          // console.log(response);
          this.userData = response;
          this.alias = response[0].alias;
          this.bio = response[0].bios;
          this.img = response[0].profilePic;
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.http.get(`http://localhost:4000/followCount/${value}`).subscribe({
      next: (response: any) => {
        // console.log(response.count);
        this.followers = response.count;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
