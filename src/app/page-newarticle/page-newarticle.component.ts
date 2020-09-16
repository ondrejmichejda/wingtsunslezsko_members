import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderService} from '../services/header-title-change.service';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-page-newarticle',
  templateUrl: './page-newarticle.component.html',
  styleUrls: ['./page-newarticle.component.css']
})

export class PageNewarticleComponent implements OnInit {

  // Keywords
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  // Quill wysiwyg editor
  modules = {
      blotFormatter: {}
  };
  output: string;

  constructor(private headerService: HeaderService) {
    this.headerService.setTitle('Nový článek');
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}

export interface Fruit {
  name: string;
}
