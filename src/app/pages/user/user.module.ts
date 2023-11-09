import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';

import { ModalChangeInfoComponent } from '../../components/modal-change-info/modal-change-info.component';
import { ModalDeleteAccountComponent } from '../../components/modal-delete-account/modal-delete-account.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserPageRoutingModule],
  declarations: [
    UserPage,
    ModalChangeInfoComponent,
    ModalDeleteAccountComponent,
  ],
})
export class UserPageModule {}
