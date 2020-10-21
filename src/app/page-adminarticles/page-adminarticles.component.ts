import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DeviceService} from '../services/device.service';
import {WTArticle} from '../class/data/WTArticle';
import {MatSort} from '@angular/material/sort';
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
import {CommonFunctions} from '../class/CommonFunctions';
import {LogService, Section} from '../services/log.service';

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
              private dialog: MatDialog,
              private log: LogService) {
    this.headerService.setTitle('Správa článků');
  }

  editor: Editor;
  common = CommonFunctions;
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
    });
  }

  imgUpdateVisibility(img: WTImage) {
    this.httpService.updateVisibleArticlePic_post(img.id, !!!+img.visible).subscribe(
      (res: WTImage[]) => {
        this.log.aInfo(Section.Article, `Změna viditelnosti obrázku článku: ${img.articleId}`, undefined, `${img.url}`)
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

  expanded(article: WTArticle){
    this.updatePic();
    this.getArticleImages(this.article.id);
    this.resetProgress();
  }

  updateEditor(article: WTArticle){
    this.article = article;
    this.editor = new Editor(this.article);
  }

  formatDate(d: string): Date{
    return CommonFunctions.sqlToJsDate(d);
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
        this.dataSource.filterPredicate = (data, filter: string): boolean =>
          data.topic.includes(CommonFunctions.getArticleTopicCode(filter)) ||
          data.name.toLowerCase().includes(filter);
        this.dataSource.sort = this.articleSort;
        this.article = this.articles[0];
        this.editor = new Editor(this.article);
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

  updateArticle(article: WTArticle){
    // set url
    console.log(this.editor.GetChanges());
    article.url = CommonFunctions.slugify(article.name);
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
    if(file.size < 3000000 && file.type ==='image/png') {
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
    if(file.size < 3000000 && file.type ==='image/png')
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

class Editor{

  private articleOrig: WTArticle;
  private article: WTArticle;

  constructor(article: WTArticle){
    this.articleOrig =
      new WTArticle(article.id, article.datetime, article.topic, article.url, article.keywords, article.metadesc,
        article.name, article.short, article.pic, article.text, article.releaseDatetime, article.visible);
    this.article = article;
  }

  Same(): boolean{
    let result = true;
    const o: WTArticle = this.articleOrig;
    const n: WTArticle = this.article;

    if(o != null && n != null){
      if(o.topic !== n.topic) result = false;
      if(o.keywords !== n.keywords) result = false;
      if(o.metadesc !== n.metadesc) result = false;
      if(o.name !== n.name) result = false;
      if(o.short !== n.short) result = false;
      if(o.text !== n.text) result = false;
      if(o.releaseDatetime !== n.releaseDatetime) result = false;

    }
    return result;
  }

  GetChanges(): string[]{
    const arr: string[] = Array();
    const o: WTArticle = this.articleOrig;
    const n: WTArticle = this.article;
    arr.push(this.eval('Jméno', o.name, n.name));
    arr.push(this.eval('Kategorie', CommonFunctions.getArticleTopic(o.topic), CommonFunctions.getArticleTopic(n.topic)));
    arr.push(this.eval('Klíčová slova', o.keywords, n.keywords));
    arr.push(this.eval('Meta popis', o.metadesc, n.metadesc));
    arr.push(this.eval('Náhledový obrázek', o.pic, n.pic));
    arr.push(this.eval('Datum publikace', o.releaseDatetime, n.releaseDatetime));
    arr.push(this.eval('Viditelnost', o.visible, n.visible, true));

    if(o.text !== n.text){
      arr.push(`Změna textu`);
    }

    if(o.short !== n.short){
      arr.push(`Změna popisu`);
    }

    const result: string[] = Array();

    for(const element of arr){
      if(element !== undefined)
        result.push(element);
    }

    return result;
  }

  private eval(name: string,propOrig: any, propNew: any, b: boolean = false): string{
    if(propOrig !== propNew){
      if(b){
        return `${name}: ${!!Number(propOrig)} -> ${!!Number(propNew)}`;
      }
      else {
        return `${name}: ${propOrig} -> ${propNew}`;
      }
    }
  }
}
