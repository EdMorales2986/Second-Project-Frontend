import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  username: string;
  profilePic: string;
  bios: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {
    this.username = '';
    this.profilePic = '';
    this.bios = '';
  }

  async ngOnInit() {
    await Preferences.get({ key: 'img' }).then(({ value }) => {
      if (value) this.profilePic = value;
    });

    await Preferences.get({ key: 'user' }).then(({ value }) => {
      if (value) this.username = value;
    });

    await Preferences.get({ key: 'bios' }).then(({ value }) => {
      if (value) this.bios = value;
    });
  }
}
