import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PageEventsComponent } from './page-events/page-events.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PageLoginComponent } from './page-login/page-login.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderService } from './services/header-title-change.service';
import { PageVideoComponent } from './page-video/page-video.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { PageNoticeboardComponent } from './page-noticeboard/page-noticeboard.component';
import { PageAdmineventsComponent } from './page-adminevents/page-adminevents.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { PageAdminnoticesComponent } from './page-adminnotices/page-adminnotices.component';
import { DialogComboboxComponent } from './dialog-combobox/dialog-combobox.component';
import { DialogNewnoticeComponent } from './dialog-newnotice/dialog-newnotice.component';
import { PageNewarticleComponent } from './page-newarticle/page-newarticle.component';
import { QuillModule } from 'ngx-quill';
import { PageAdminarticlesComponent } from './page-adminarticles/page-adminarticles.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogArticleComponent } from './dialog-article/dialog-article.component';
import { PageAdminmembersComponent } from './page-adminmembers/page-adminmembers.component';
import { DialogResetpwdComponent } from './dialog-resetpwd/dialog-resetpwd.component';
import { DialogUpdatememberComponent } from './dialog-updatemember/dialog-updatemember.component';
import { DialogVideoComponent } from './dialog-video/dialog-video.component';
import { PageAdminvideosComponent } from './page-adminvideos/page-adminvideos.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { PageAdminlogComponent } from './page-adminlog/page-adminlog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageEventsComponent,
    PageLoginComponent,
    DialogComponent,
    PageDashboardComponent,
    PageVideoComponent,
    PageNoticeboardComponent,
    PageAdmineventsComponent,
    DialogConfirmComponent,
    PageAdminnoticesComponent,
    DialogComboboxComponent,
    DialogNewnoticeComponent,
    PageNewarticleComponent,
    PageAdminarticlesComponent,
    DialogArticleComponent,
    PageAdminmembersComponent,
    DialogResetpwdComponent,
    DialogUpdatememberComponent,
    DialogVideoComponent,
    PageAdminvideosComponent,
    PageSettingsComponent,
    PageAdminlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    BrowserModule,
    HttpClientModule,
    MatButtonToggleModule,
    QuillModule.forRoot(),
    MatProgressBarModule
  ],
  entryComponents: [DialogComponent],
  providers: [HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
