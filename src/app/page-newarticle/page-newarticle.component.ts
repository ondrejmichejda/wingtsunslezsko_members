import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';

@Component({
  selector: 'app-page-newarticle',
  templateUrl: './page-newarticle.component.html',
  styleUrls: ['./page-newarticle.component.css']
})
export class PageNewarticleComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    this.headerService.setTitle('Nový článek');
  }

  ngOnInit(): void {
  }

}
