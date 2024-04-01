import * as path from 'path';
import { findFilesByName } from './find-file-by-name.mjs';

export function fundModules(baseDir) {
  const modulesPath = findFilesByName(baseDir, 'public-api.ts');
  return modulesPath.map(modulePath => ({
    modulePublicApiPath: modulePath,
    moduleName: path.basename(path.dirname(modulePath))
  }));
}