import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-artikl',
  templateUrl: './page-artikl.component.html',
  styleUrls: ['./page-artikl.component.css']
})
export class PageArtiklComponent implements OnInit {

  artikls = this.dataService.GetArtiklData().Data;
  user = this.dataService.GetUserData();

  constructor(public dataService: DataService,
              private dialog: MatDialog,
              private headerService: HeaderService) { }

  public GetArtiklState(artiklId: number): number {
    let status = 0; // not ordered

    if (this.user.confirmedArtikls.indexOf(artiklId) > -1) {
      status = 2; // ordered
    }

    return status;
  }

  public GetArtiklStateText(artiklId: number): string {
    return ArtiklState[this.GetArtiklState(artiklId)];
  }

  ngOnInit() {
    this.headerService.setTitle('Artikl');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {text: 'Velikost?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dataService.SetSignInUserToArtikl(undefined, undefined);
      }
    });
  }

}

enum ArtiklState {
  'Neobjednáno',
  'Objednáno' = 2,
}
