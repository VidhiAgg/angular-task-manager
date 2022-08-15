import { TestBed } from '@angular/core/testing';

import { TaskPriorityService } from './task-priority.service';

describe('TaskPriorityService', () => {
  let service: TaskPriorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskPriorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
