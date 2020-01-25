import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpanelComponent } from './testpanel.component';

describe('TestpanelComponent', () => {
  let component: TestpanelComponent;
  let fixture: ComponentFixture<TestpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
