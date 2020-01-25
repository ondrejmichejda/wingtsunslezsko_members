import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArtiklComponent } from './page-artikl.component';

describe('PageArtiklComponent', () => {
  let component: PageArtiklComponent;
  let fixture: ComponentFixture<PageArtiklComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArtiklComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArtiklComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
