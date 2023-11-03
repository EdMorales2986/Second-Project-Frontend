import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  ngOnInit() {}

  onSubmit() {
    this.http
      .post('http://localhost:4000/signin', {
        alias: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
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
