// ----------- EXTERNAL -----------

export interface ElectronStorageOptions {
  fileExtension?: string;
  location?: string;
  debounce?: number;
}

export interface PersistNotification {
  store: string;
  serializedState: string;
}

// ----------- INTERNAL -----------

export interface ElectronStoreOptions extends ElectronStorageOptions {
  name: string;
}

export interface SaveRequest {
  name: string;
  serializedState: string;
}
