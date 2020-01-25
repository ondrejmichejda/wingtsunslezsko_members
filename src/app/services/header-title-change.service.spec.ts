import { TestBed } from '@angular/core/testing';

import { HeaderTitleChangeService } from './header-title-change.service';

describe('HeaderTitleChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderTitleChangeService = TestBed.get(HeaderTitleChangeService);
    expect(service).toBeTruthy();
  });
});
