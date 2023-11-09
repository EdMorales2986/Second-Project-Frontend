import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommFeedPage } from './comm-feed.page';

const routes: Routes = [
  {
    path: '',
    component: CommFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommFeedPageRoutingModule {}
