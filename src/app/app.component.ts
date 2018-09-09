import {Component} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {SetName} from "./store/meta";
import {Observable} from "rxjs";
import {AddPerson, PersonMap} from "./store/database";
import {ElectronStorageService} from "ngxs-electron-storage";

function byteCount(s) {
  return encodeURI(s).split(/%..|./).length - 1;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select() meta$: Observable<string>;
  @Select() persons$: Observable<PersonMap>;

  constructor(private store: Store, private persistence: ElectronStorageService) {
    this.persistence.persistNotifications$
      .subscribe(({store, serializedState}) =>
        console.log(`Persisted ${store}. Wrote ${byteCount(serializedState)} bytes.`));
  }

  changeState() {
    this.store.dispatch(new SetName(new Date().toJSON()));
  }

  addPerson() {
    this.store.dispatch(new AddPerson({
      id: getRandomString(),
      name: getRandomString()
    }));
  }

}

function getRandomString(): string {
  return Math.random().toString(36).substring(7);
}
