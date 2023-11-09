import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';

import { SeacrhResultComponent } from 'src/app/components/seacrh-result/seacrh-result.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SearchPageRoutingModule],
  declarations: [SearchPage, SeacrhResultComponent],
})
export class SearchPageModule {}
