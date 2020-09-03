import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuilloptionsService {

  constructor() { }

  basicToolbar = [
    ['bold', 'italic', 'underline'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ indent: '-1'}, { indent: '+1' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ['link', 'video']
  ];
}
