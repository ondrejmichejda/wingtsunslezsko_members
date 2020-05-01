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
import { TestpanelComponent } from './testpanel/testpanel.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { PageArtiklComponent } from './page-artikl/page-artikl.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { PageChatComponent } from './page-chat/page-chat.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderService } from './services/header-title-change.service';
import { PageVideoComponent } from './page-video/page-video.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { PageNoticeboardComponent } from './page-noticeboard/page-noticeboard.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageEventsComponent,
    PageLoginComponent,
    TestpanelComponent,
    PageArtiklComponent,
    DialogComponent,
    PageChatComponent,
    PageDashboardComponent,
    PageVideoComponent,
    PageNoticeboardComponent
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
    CKEditorModule
  ],
  entryComponents: [DialogComponent],
  providers: [HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
