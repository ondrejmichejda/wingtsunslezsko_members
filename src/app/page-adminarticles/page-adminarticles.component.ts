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
import {WTImage} from '../class/data/WTImage';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import {DialogArticleComponent} from '../dialog-article/dialog-article.component';

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

  constructor(private headerService: HeaderService,
              public device: DeviceService,
              private httpService: HttpService,
              private exceptions: ExceptionsService,
              private alertService: AlertService,
              private dialog: MatDialog) {
    this.headerService.setTitle('Správa článků');
  }

  dataSource;
  columnsToDisplay = this.device.IsMobile() ? ['name', 'control'] : ['id', 'topic', 'name', 'release', 'control'];
  expandedElement: WTArticle | null;
  @ViewChild('articleSort', {static: true}) articleSort: MatSort;
  articles: WTArticle[];
  article: WTArticle;
  images: WTImage[];
  picPath = '../img/empty_pic.svg';
  error = '';
  history = false;
  fileUploadProgress = 0;
  fileUploadProgressStep = 0;

  resetProgress(){
    this.fileUploadProgress = 0;
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getImgPath(url: string): string {
    return '..' + url;
  }

  dialogEdit(article: WTArticle): void {
    const dialogRef = this.dialog.open(DialogArticleComponent, {
      width: '90vw',
      data: { text: article.text, name: article.name, id: article.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      article.text = result.text;
      this.updateArticle(article, false);
    });
  }

  imgUpdateVisibility(img: WTImage) {
    this.httpService.updateVisibleArticlePic_post(img.id, !!!+img.visible).subscribe(
      (res: WTImage[]) => {
        this.alertService.alert(AlertTexts.article_updated, SnackType.info);
        this.getArticleImages(img.articleId);
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  imgDelete(img: WTImage) {
    this.exceptions.NotImplemented();
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

  filterID(article: WTArticle) {
    this.dataSource.filter = article.id;
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

  expanded(article: WTArticle){
    this.expandedTest();
    this.article = article;
    this.updatePic();
    this.getArticleImages(this.article.id);
    this.resetProgress();
  }

  expandedTest(){

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
        this.dataSource.filterPredicate = (data, filter: string): boolean => data.id.toLowerCase().includes(filter);
        this.article = this.articles[0];
      },
      (err) => {
        this.error = err;
        this.alertService.alert(AlertTexts.fail, SnackType.error);
      }
    );
  }

  getArticleImages(id: number): void {
    this.httpService.getArticleImages(id).subscribe(
      (images: WTImage[]) => {
          this.images = images;
      },
      (err) => {
        this.alertService.alert(AlertTexts.fail, SnackType.error);
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

  updateArticle(article: WTArticle, refresh: boolean){
    // set url
    article.url = this.slugify(article.name);
    this.httpService.setArticle_post(article).subscribe(data => {
      this.alertService.alert(AlertTexts.article_updated, SnackType.info);
      if(refresh)
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
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {text: 'Opravdu smazat?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteArticle(article);
      }
    });
  }



  deleteArticle(article: WTArticle){
    this.httpService.deleteArticle_post(article.id).subscribe(data => {
      this.alertService.alert(AlertTexts.event_deleted, SnackType.info);
      this.getArticles();
    },Error => {
      console.log(Error);
      this.alertService.alert(AlertTexts.event_deleted, SnackType.info);
      this.getArticles();
    });
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
    this.fileUploadProgressStep = 100 / files.length;
    this.resetProgress();
    Array.from(files).forEach(file => {
      this.photoUpload(file, article);
      this.fileUploadProgress += this.fileUploadProgressStep;
    });
    setTimeout(() =>{
      this.getArticleImages(article.id);
    }, 1000);
  }

  photoUpload(file: File, article: WTArticle) {
    if(file.size < 1000000 && file.type ==='image/png') {
      this.httpService.postFileGallery(file, article.id).subscribe(data => {
      }, error => {
        console.log('error:');
        console.log(error);
        this.alertService.alert(AlertTexts.fail_check_console, SnackType.error);
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
      this.alertService.alert(AlertTexts.fail_check_console, SnackType.error);
    });
  }


}
