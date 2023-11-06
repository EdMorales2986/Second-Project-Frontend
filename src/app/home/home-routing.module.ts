import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FeedPage } from '../feed/feed.page';
import { SearchPage } from '../search/search.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        component: FeedPage,
      },
      {
        path: 'search',
        component: SearchPage,
      },
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
