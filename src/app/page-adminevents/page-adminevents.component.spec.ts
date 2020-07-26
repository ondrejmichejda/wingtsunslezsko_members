import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdmineventsComponent } from './page-adminevents.component';

describe('PageAdmineventsComponent', () => {
  let component: PageAdmineventsComponent;
  let fixture: ComponentFixture<PageAdmineventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdmineventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdmineventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
