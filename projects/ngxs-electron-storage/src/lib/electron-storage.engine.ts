import {Injectable} from "@angular/core";
import {ElectronStorageService} from "./electron-storage.service";
import {StorageEngine} from '@ngxs/storage-plugin';

@Injectable()
export class ElectronStorageEngine implements StorageEngine  {

  // @Inject(NGXS_STORAGE_PLUGIN_OPTIONS) private storageOptions: NgxsStoragePluginOptions

  constructor(private storage: ElectronStorageService) {
  }

  getItem(key: any): string {
    return this.storage.getStore(key).getContent();
  }

  setItem(key: any, val: any): void {
    this.storage.saveState({
      name: key,
      serializedState: val
    });
  }

  get length(): number {
    return this.storage.storeCount;
  }

  clear(): void {
    this.storage.getAllStores().forEach(store => store.clear());
  }

  key(val: number): string {
    return this.storage.getKeyForIndex(val);
  }

  removeItem(key: any): void {
    this.storage.removeStore(key);
  }

}
