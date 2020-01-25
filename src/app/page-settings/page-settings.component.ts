import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.css']
})
export class PageSettingsComponent implements OnInit {

  user = this.dataService.GetUserData();
  userSettingsBackup: Array<boolean> = new Array<boolean>();

  constructor(private dataService: DataService,
              private headerService: HeaderService) {}

  @ViewChild('SaveBtn', undefined) saveBtn;
  @ViewChild('CancelBtn', undefined) cancelBtn;

  ngOnInit() {
    this.userSettingsBackup = Object.assign([], this.user.settings);
    this.headerService.setTitle('Nastavení');
  }

  private EnableButtons(enable: boolean): void {
    this.saveBtn.disabled = !enable;
    this.cancelBtn.disabled = !enable;
  }

  private SettingsChange(): void {
    this.EnableButtons(true);
  }

  private CancelChanges(): void {
    this.user.settings = Object.assign([], this.userSettingsBackup);
    this.EnableButtons(false);
  }

  private SaveChanges(): void {
    this.dataService.SetUserSettings(0, [true]);
    this.EnableButtons(false);
  }
}
