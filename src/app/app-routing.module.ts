import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageEventsComponent } from './page-events/page-events.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageVideoComponent } from './page-video/page-video.component';
import { PageNoticeboardComponent } from './page-noticeboard/page-noticeboard.component';
import {PageAdmineventsComponent} from './page-adminevents/page-adminevents.component';
import {PageAdminnoticesComponent} from './page-adminnotices/page-adminnotices.component';
import {AuthGuardService} from './services/auth-guard.service';
import {PageNewarticleComponent} from './page-newarticle/page-newarticle.component';
import {PageAdminarticlesComponent} from './page-adminarticles/page-adminarticles.component';
import {PageAdminmembersComponent} from './page-adminmembers/page-adminmembers.component';
import {PageAdminvideosComponent} from './page-adminvideos/page-adminvideos.component';
import {PageSettingsComponent} from './page-settings/page-settings.component';
import {PageAdminlogComponent} from './page-adminlog/page-adminlog.component';



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
    path: 'video',
    component: PageVideoComponent,
  },
  {
    path: 'nastaveni',
    component: PageSettingsComponent,
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
    path: 'admin-clanky',
    component: PageAdminarticlesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin-clenove',
    component: PageAdminmembersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin-videa',
    component: PageAdminvideosComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin-log',
    component: PageAdminlogComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuardService ]
})
export class AppRoutingModule {}
