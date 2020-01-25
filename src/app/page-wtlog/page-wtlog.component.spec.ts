import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWtlogComponent } from './page-wtlog.component';

describe('PageWtlogComponent', () => {
  let component: PageWtlogComponent;
  let fixture: ComponentFixture<PageWtlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWtlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWtlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
