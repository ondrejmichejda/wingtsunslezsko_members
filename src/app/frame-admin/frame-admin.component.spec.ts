import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameAdminComponent } from './frame-admin.component';

describe('FrameAdminComponent', () => {
  let component: FrameAdminComponent;
  let fixture: ComponentFixture<FrameAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
