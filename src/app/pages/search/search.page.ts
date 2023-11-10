import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  user: string = '';
  users = [];

  constructor(private http: HttpClient) {}

  search(event: any) {
    if (event.target.value != '') {
      this.http
        .post(
          `https://second-project-backend-production.up.railway.app/search`,
          {
            query: `${event.target.value}`,
          }
        )
        .subscribe((users: any) => {
          users.forEach((user: any) => {
            if (user.alias == this.user) {
              users.splice(users.indexOf(user), 1);
            }
          });

          this.users = users;
        });
    }
  }

  async ngOnInit() {
    await Preferences.get({ key: 'alias' }).then((value) => {
      this.user = value.value ?? '';
    });
  }
}
