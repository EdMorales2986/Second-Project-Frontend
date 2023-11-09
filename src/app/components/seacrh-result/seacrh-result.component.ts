import { Component, OnInit, Input } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seacrh-result',
  templateUrl: './seacrh-result.component.html',
  styleUrls: ['./seacrh-result.component.scss'],
})
export class SeacrhResultComponent implements OnInit {
  @Input() data: any;
  user: string;
  followed: boolean;

  constructor(private http: HttpClient) {
    this.user = '';
    this.followed = false;
  }

  follow() {
    this.http
      .get(`http://localhost:4000/follow/${this.user}/${this.data.alias}`)
      .subscribe({
        next: (value: any) => {
          this.followed = value.followed;
        },
      });
  }

  async ngOnInit() {
    await Preferences.get({ key: 'alias' }).then((value) => {
      this.user = value.value ?? '';

      this.http
        .get(
          `http://localhost:4000/followVerify/${this.user}/${this.data.alias}`
        )
        .subscribe({
          next: (value: any) => {
            this.followed = value.followed;
          },
        });
    });
  }
}
