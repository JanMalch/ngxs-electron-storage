import * as electron from "electron";
import {ElectronStorageOptions} from "./models";

export const defaultCwd = (electron.app || electron.remote.app).getPath('userData');

export const defaultElectronStoreOptions: ElectronStorageOptions = {
  fileExtension: "json",
  debounce: 0,
  location: defaultCwd
};
