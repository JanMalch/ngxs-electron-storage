import {InjectionToken} from "@angular/core";
import {ElectronStorageOptions} from "./models";

export const ELECTRON_STORAGE_OPTIONS = new InjectionToken<ElectronStorageOptions>("ELECTRON_STORAGE_OPTIONS");
