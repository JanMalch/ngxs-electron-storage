import {Inject, Injectable, OnDestroy} from '@angular/core';
import {ElectronStorageOptions, PersistNotification, SaveRequest} from "./models";
import {ELECTRON_STORAGE_OPTIONS} from "./tokens";
import {ElectronStore} from "./electron-store";
import {Observable, Subject} from "rxjs";
import {EnsuringMap} from "./ensuring-map";
import {defaultCwd, defaultElectronStoreOptions} from "./electron";
import {ensureDirSync} from "./node.util";

@Injectable({
  providedIn: 'root'
})
export class ElectronStorageService implements OnDestroy {

  private readonly stores = new EnsuringMap<string, ElectronStore>(name => this.createStore(name));
  private readonly persisted = new Subject<PersistNotification>();
  private readonly options: ElectronStorageOptions;

  constructor(@Inject(ELECTRON_STORAGE_OPTIONS) userOptions: ElectronStorageOptions) {
    this.options = {...defaultElectronStoreOptions, ...userOptions};
    const {location} = this.options;

    if(!!location && location.startsWith("~")) {
      this.options.location = location.replace("~", defaultCwd);
    }

    ensureDirSync(this.options.location);
  }

  getStore(name: string): ElectronStore {
    return this.stores.get(name);
  }

  getAllStores(): ElectronStore[] {
    return Array.from(this.stores.values());
  }

  saveState({name, serializedState}: SaveRequest) {
    this.getStore(name).queuePersistTask(serializedState);
  }

  removeStore(name: string) {
    if( this.stores.has(name)) {
      const store = this.stores.get(name);
      if (!!store) store.deleteFile();
      this.stores.delete(name);
    }
  }

  private createStore(name: string): ElectronStore {
    const store = new ElectronStore({...this.options, name});
    store.persistNotifications$.subscribe(notification => this.persisted.next(notification));
    return store;
  }

  get storeCount(): number {
    return this.stores.size;
  }

  get persistNotifications$(): Observable<PersistNotification> {
    return this.persisted.asObservable();
  }

  getKeyForIndex(index: number): string | undefined {
    return Array.from(this.stores.keys())[index];
  }

  ngOnDestroy(): void {
    this.stores.forEach(store => store.ngOnDestroy());
  }
}
