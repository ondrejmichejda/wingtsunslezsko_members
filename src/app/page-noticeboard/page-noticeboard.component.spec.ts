import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNoticeboardComponent } from './page-noticeboard.component';

describe('PageNoticeboardComponent', () => {
  let component: PageNoticeboardComponent;
  let fixture: ComponentFixture<PageNoticeboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNoticeboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNoticeboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
