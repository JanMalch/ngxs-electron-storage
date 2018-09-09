import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {OnDestroy} from "@angular/core";
import {sep} from "path";
import {copyFile, existsSync, readFileSync, unlink, writeFile} from "fs";
import {ElectronStoreOptions, PersistNotification} from "./models";

export class ElectronStore implements OnDestroy, ElectronStoreOptions {

  private readonly notifications$ = new Subject<PersistNotification>();
  private readonly queue = new Subject<any>();

  public readonly name: string;
  public readonly fileExtension: string;
  public readonly debounce: number;
  public readonly location: string;

  constructor(options: ElectronStoreOptions) {
    Object.assign(this, options);

    this.queue.pipe(
      distinctUntilChanged(),
      debounceTime(this.debounce)
    ).subscribe(state => this.persist(state));
  }

  private persist(serializedState: string) {
    writeFile(this.fullPath,
      serializedState,
      () => this.notify(serializedState)
    );
  }

  private notify(serializedState: string) {
    this.notifications$.next({
      store: this.name,
      serializedState
    });
  }

  queuePersistTask(serializedState: string) {
    this.queue.next(serializedState);
  }

  getContent(): string | undefined {
    if(!existsSync(this.fullPath)) {
      return undefined;
    }
    return readFileSync(this.fullPath, {encoding: "utf-8"});
  }

  clear(callback?: Function) {
    writeFile(this.fullPath, "", () => callback());
  }

  deleteFile(callback?: Function) {
    unlink(this.fullPath, () => callback());
  }

  exportTo(dirPath: string, callback?: Function) {
    copyFile(this.fullPath, dirPath + sep + this.name + "." + this.fileExtension, () => callback());
  }

  get persistNotifications$(): Observable<PersistNotification> {
    return this.notifications$.asObservable();
  }

  get fullPath(): string {
    return this.location + sep + this.name + "." + this.fileExtension;
  }

  ngOnDestroy(): void {
    this.notifications$.complete();
    this.queue.complete();
  }

}
