import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');
    this.http
      .post('http://localhost:4000/jwt-verify', {
        token: `${jwt}`,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: () => {
          this.router.navigate(['']);
        },
      });
  }

  onSubmit() {
    this.http
      .post(
        'http://localhost:4000/signin',
        {
          alias: this.username,
          password: this.password,
        },
        { observe: 'response' }
      )
      .subscribe({
        next: (response) => {
          const { jwt }: any = response.body;
          localStorage.setItem('jwt', jwt);
          // console.log(jwt);
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
