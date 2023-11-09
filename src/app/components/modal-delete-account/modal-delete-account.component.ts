import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-modal-delete-account',
  templateUrl: './modal-delete-account.component.html',
  styleUrls: ['./modal-delete-account.component.scss'],
})
export class ModalDeleteAccountComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}
  password: string = '';

  @Input() userName!: string;

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.http
      .delete(`http://localhost:4000/${this.userName}/delete`, {
        body: { password: this.password },
      })
      .subscribe({
        next: async () => {
          await Preferences.remove({ key: 'jwt' });
          await Preferences.remove({ key: 'alias' });
          this.modalController.dismiss();
          this.router.navigate(['/']).then(() => {
            location.reload();
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit() {}
}
