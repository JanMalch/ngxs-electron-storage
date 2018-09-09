import {existsSync, mkdirSync} from "fs";

export function ensureDirSync(dirPath: string) {
  if (existsSync(dirPath)) {
    return;
  }

  mkdirSync(dirPath);
}
