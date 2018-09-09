import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgxsModule} from "@ngxs/store";
import {states} from "./store";
import {NgxsStoragePluginModule, STORAGE_ENGINE} from "@ngxs/storage-plugin";
import {ElectronStorageEngine, NgxsElectronStorageModule} from "ngxs-electron-storage";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot(states),
    NgxsElectronStorageModule.forRoot({
      debounce: 1000,
      location: "~\\data"
    }),
    NgxsStoragePluginModule.forRoot({
      key: ["meta.timestamp", "persons"]
    })
  ],
  providers: [
    {
      provide: STORAGE_ENGINE,
      useClass: ElectronStorageEngine
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
