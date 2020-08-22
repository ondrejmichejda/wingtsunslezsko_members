import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DeviceService} from '../services/device.service';
import {WTArticle} from '../class/data/WTArticle';
import {MatSort} from '@angular/material/sort';
import {Convert} from '../class/Convert';
import {MatTableDataSource} from '@angular/material/table';
import {HttpService} from '../services/http.service';
import {HeaderService} from '../services/header-title-change.service';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';

@Component({
  selector: 'app-page-adminarticles',
  templateUrl: './page-adminarticles.component.html',
  styleUrls: ['./page-adminarticles.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PageAdminarticlesComponent implements OnInit {

  dataSource;
  columnsToDisplay = this.device.IsMobile() ? ['name', 'control'] : ['id', 'topic', 'name', 'release', 'control'];
  expandedElement: WTArticle | null;
  @ViewChild('articleSort', {static: true}) articleSort: MatSort;
  articles: WTArticle[];
  article: WTArticle;
  error = '';

  // Quill wysiwyg editor
  modules = {
    blotFormatter: {}
  };

  constructor(private headerService: HeaderService,
              public device: DeviceService,
              public httpService: HttpService) {
    this.headerService.setTitle('Správa článků');
  }

  ngOnInit(): void {
    this.getArticles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  expanded(article: WTArticle){
    // this.article = article;
  }

  formatDate(d: string): Date{
    return Convert.sqlToJsDate(d);
  }

  // Data workflows
  getArticles(): void {
    this.httpService.getArticles().subscribe(
      (articles: WTArticle[]) => {
        this.articles = articles;
        this.dataSource = new MatTableDataSource(this.articles);
        this.dataSource.sort = this.articleSort;
        this.article = this.articles[0];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  createArticle(){
    throw new Error('not implemented');
  }

  updateEvent(article: WTArticle){
    throw new Error('not implemented');
  }

  changeVisibility(article: WTArticle){
    throw new Error('not implemented');
  }

  dialogDelete(article: WTArticle){
    throw new Error('not implemented');
  }

  copyEvent(article: WTArticle){
    throw new Error('not implemented');
  }

  // Help functions
  stringCut(text: string, limit: number): string{
    if(text.length > limit)
      return text.substring(0, limit-3) + '...';
    else return text;
  }

  getTopic(topic: number): string{
    switch(Number(topic)){
      case 1:
        return 'Aktualita';
      case 2:
        return 'Kurz';
      case 3:
        return 'Wing Tsun';
      case 4:
        return 'Prevence';
      case 5:
        return 'Děti';
      default:
        return 'chyba';
    }
  }

}
