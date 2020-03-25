import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageEventsComponent } from './page-events/page-events.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { PageArtiklComponent } from './page-artikl/page-artikl.component';
import { PageChatComponent } from './page-chat/page-chat.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageVideoComponent } from './page-video/page-video.component';
import { PageNoticeboardComponent } from './page-noticeboard/page-noticeboard.component';



const routes: Routes = [
  {
    path: '',
    component: PageDashboardComponent,
  },
  {
    path: 'prehled',
    component: PageDashboardComponent,
  },
  {
    path: 'nastenka',
    component: PageNoticeboardComponent,
  },
  {
    path: 'udalosti',
    component: PageEventsComponent,
  },
  {
    path: 'artikl',
    component: PageArtiklComponent,
  },
  {
    path: 'chat',
    component: PageChatComponent,
  },
  {
    path: 'video',
    component: PageVideoComponent,
  },
  {
    path: 'nastaveni',
    component: PageSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
