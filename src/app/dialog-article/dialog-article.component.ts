import {Component, Inject, OnInit, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {QuilloptionsService} from '../services/quilloptions.service';
import {WTArticle} from '../class/data/WTArticle';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {WTImage} from '../class/data/WTImage';
import {AlertTexts} from '../enum/AlertTexts';
import {SnackType} from '../enum/SnackType';
import {HttpService} from '../services/http.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrls: ['./dialog-article.component.css']
})
export class DialogArticleComponent implements OnInit, PipeTransform {

  article: WTArticle;
  images: WTImage[];
  showPG = false;   // pickup gallery show
  editorInstance;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              private quillService: QuilloptionsService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private domSanitizer: DomSanitizer,
              private httpService: HttpService,
              private alertService: AlertService) {
    this.getArticleImages(data.id);
  }

  toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ indent: '-1'}, { indent: '+1' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ['link', 'video']
  ];

  // Quill wysiwyg editor
  modules = {
    toolbar: {
      container: this.toolbarOptions
    },
    blotFormatter: {}
  };

  onEditorCreated(quillInstance) {
    this.editorInstance = quillInstance
  }

  transform(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  addImg(img: WTImage){
    const value = '..' + img.url;
    const range = this.editorInstance.getSelection(true);
    this.editorInstance.insertEmbed(range.index, 'image', value, 'user');
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

  togglePickupGallery() {
    this.showPG = !this.showPG;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

export interface DialogData {
  id: number;
  text: string;
  name: string;
}
