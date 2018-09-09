import {ModuleWithProviders, NgModule} from '@angular/core';
import {ElectronStorageOptions} from "./models";
import {ELECTRON_STORAGE_OPTIONS} from "./tokens";

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})
export class NgxsElectronStorageModule {

  static forRoot(options?: ElectronStorageOptions): ModuleWithProviders {
    return {
      ngModule: NgxsElectronStorageModule,
      providers: [
        {
          provide: ELECTRON_STORAGE_OPTIONS,
          useValue: options
        }
      ]
    }
  }

}
