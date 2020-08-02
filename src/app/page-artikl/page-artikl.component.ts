import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-artikl',
  templateUrl: './page-artikl.component.html',
  styleUrls: ['./page-artikl.component.css']
})
export class PageArtiklComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Artikl');
  }
}
