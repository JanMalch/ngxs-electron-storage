import { TestBed, inject } from '@angular/core/testing';

import { ElectronStorageService } from './electron-storage.service';

describe('ElectronStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectronStorageService]
    });
  });

  it('should be created', inject([ElectronStorageService], (service: ElectronStorageService) => {
    expect(service).toBeTruthy();
  }));
});
