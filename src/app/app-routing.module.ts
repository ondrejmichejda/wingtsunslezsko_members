import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageEventsComponent } from './page-events/page-events.component';
import { PageArtiklComponent } from './page-artikl/page-artikl.component';
import { PageChatComponent } from './page-chat/page-chat.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageVideoComponent } from './page-video/page-video.component';
import { PageNoticeboardComponent } from './page-noticeboard/page-noticeboard.component';
import {PageAdmineventsComponent} from './page-adminevents/page-adminevents.component';
import {PageAdminnoticesComponent} from './page-adminnotices/page-adminnotices.component';
import {AuthGuardService} from './services/auth-guard.service';
import {PageNewarticleComponent} from './page-newarticle/page-newarticle.component';



const routes: Routes = [
  {
    path: '',
    component: PageNoticeboardComponent,
  },
  {
    path: 'nastenka',
    component: PageNoticeboardComponent,
  },
  {
    path: 'prehled',
    component: PageDashboardComponent,
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
    path: 'admin-udalosti',
    component: PageAdmineventsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin-nastenka',
    component: PageAdminnoticesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'novy-clanek',
    component: PageNewarticleComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuardService ]
})
export class AppRoutingModule { }
