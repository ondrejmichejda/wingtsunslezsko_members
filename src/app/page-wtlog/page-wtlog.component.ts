import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-wtlog',
  templateUrl: './page-wtlog.component.html',
  styleUrls: ['./page-wtlog.component.css']
})
export class PageWtlogComponent implements OnInit {

  logs = this.dataService.GetWTLogData().Data;

  constructor(private dataService: DataService,
              private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setTitle('Nástěnka');
  }

}
