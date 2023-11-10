import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    // const jwt = localStorage.getItem('jwt');
    const { value } = await Preferences.get({ key: 'jwt' });
    this.http
      .post(
        'https://second-project-backend-production.up.railway.app/jwt-verify',
        {
          token: `${value}`,
        }
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: async () => {
          await Preferences.remove({ key: 'jwt' });
          await Preferences.remove({ key: 'alias' });
          // await Preferences.remove({ key: 'img' });
          // await Preferences.remove({ key: 'bios' });
          this.router.navigate(['']);
        },
      });
  }

  onSubmit() {
    this.http
      .post(
        'https://second-project-backend-production.up.railway.app/signin',
        {
          alias: this.username,
          password: this.password,
        },
        { observe: 'response' }
      )
      .subscribe({
        next: async (response) => {
          const { jwt, user }: any = response.body;
          // localStorage.setItem('jwt', jwt);
          await Preferences.set({ key: 'jwt', value: jwt });
          await Preferences.set({ key: 'alias', value: user.alias });
          // await Preferences.set({ key: 'img', value: user.profilePic });
          // await Preferences.set({ key: 'bios', value: user.bios });
          this.router.navigate(['/home']);
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
}
