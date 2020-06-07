import { TestBed } from '@angular/core/testing';

import { CourseDataService } from './course-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('CourseDataService', () => {
  let service: CourseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(CourseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
