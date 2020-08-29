import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
import {ExceptionsService} from '../services/exceptions.service';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {AlertService} from '../services/alert.service';

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
  picPath = '';
  error = '';
  history = false;


  // Quill wysiwyg editor
  modules = {
    blotFormatter: {}
  };

  constructor(private headerService: HeaderService,
              public device: DeviceService,
              private httpService: HttpService,
              private exceptions: ExceptionsService,
              private alertService: AlertService,
              private cdRef: ChangeDetectorRef) {
    this.headerService.setTitle('Správa článků');
  }

  ngOnInit(): void {
    this.getArticles();
  }

  updatePic() {
    this.picPath = '';
    setTimeout(() => {
      this.picPath = '../gallery/' + this.article.id + '/pic.png?' + new Date() }
      , 100);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  expanded(article: WTArticle){
    this.article = article;
    this.updatePic();
  }

  formatDate(d: string): Date{
    return Convert.sqlToJsDate(d);
  }

  // Data workflows
  getArticles(): void {
    this.httpService.getArticles().subscribe(
      (articles: WTArticle[]) => {
        if(this.history){
          this.articles = articles;
        }
        else {
          const actDate = new Date();
          actDate.setHours(actDate.getHours() - 24);
          this.articles = articles.filter(art => this.formatDate(art.datetime) >= actDate);
        }
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
    this.httpService.createArticle_post().subscribe(
      (res: boolean) => {
        this.alertService.alert(AlertTexts.article_created, SnackType.info);
        this.getArticles();
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  updateArticle(article: WTArticle){
    // set url
    article.url = this.slugify(article.name);
    console.log(article);
    this.httpService.setArticle_post(article).subscribe(data => {
      this.alertService.alert(AlertTexts.article_updated, SnackType.info);
      this.getArticles();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.fail, SnackType.error);
    });
  }

  changeVisibility(article: WTArticle){
    this.httpService.updateVisibleArticle_post(article.id, !!!+article.visible).subscribe(
      (res: WTArticle[]) => {
        this.alertService.alert(AlertTexts.article_updated, SnackType.info);
        this.getArticles();
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  dialogDelete(article: WTArticle){
    this.exceptions.NotImplemented();
  }

  copyEvent(article: WTArticle){
    this.exceptions.NotImplemented();
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
        return 'NUTNO DOPLNIT!';
    }
  }

  slugify(str: string): string {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return str.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  // file upload

  multipleFileInput(files: FileList, article: WTArticle) {
    Array.from(files).forEach(file => {
      this.photoUpload(file, article);
    });
  }

  photoUpload(file: File, article: WTArticle) {
    if(file.size < 1000000 && file.type ==='image/png') {
      this.httpService.postFileGallery(file, article.id).subscribe(data => {
      }, error => {
        console.log('error:');
        console.log(error);
      });
    }
    else
      this.alertService.alert(AlertTexts.pic_format_fail + ': ' + file.name, SnackType.error);
  }

  // pic
  handleFileInput(files: FileList, article: WTArticle) {
    const file = files.item(0);
    if(file.size < 1000000 && file.type ==='image/png')
      this.uploadFileToActivity(file, article.id);
    else
      this.alertService.alert(AlertTexts.pic_format_fail + ': ' + file.name, SnackType.error);
  }
  uploadFileToActivity(file: File, articleId: number) {
    this.httpService.postFilePic(file, articleId).subscribe(data => {
      this.updatePic();
    }, error => {
      console.log('error:');
      console.log(error);
    });
  }


}
