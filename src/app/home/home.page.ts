import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userImg: string;

  constructor() {
    this.userImg = '';
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'img' });
  }
}
