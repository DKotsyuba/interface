import * as path from 'path';
import * as fs from 'fs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import pkgGlobal from '../../package.json'
import renameOutput from './rollup-plugin-rename';

export function rollupLibBuilder(options) {
  const {
    libName
  } = options

  const projectRoot = path.dirname(path.dirname(__dirname))
  const libRoot = path.resolve(projectRoot, 'libs', libName)
  const dist = path.resolve(projectRoot, 'dist', 'libs', libName)
  const tsconfigPath = path.resolve(projectRoot, 'libs', libName, 'tsconfig.lib.json')

  const modules = fundModules(libRoot)
  console.log('library modules found:', modules.map(m => `\n ->> ${m.moduleName}`).join(''))

  function buildConfig({ modulePublicApiPath, moduleName }) {
    const moduleDistPath = path.resolve(dist, moduleName)
    const moduleFullName = `@${pkgGlobal.name}/${libName}/${moduleName}`
    const moduleMainCJSFile = path.resolve(moduleDistPath, 'index.cjs.js')
    const moduleMainESMFile = path.resolve(moduleDistPath, 'index.esm.js')
    const moduleMainTypesFile = path.resolve(moduleDistPath, 'index.d.ts')
    const modulePublicApiPathTypes = path.join(
      dist,
      moduleName,
      modulePublicApiPath.replace(path.resolve(projectRoot, 'libs', libName), '')
    ).replace('.ts', '.d.ts')

    const typescriptConfig = {
      tsconfig: tsconfigPath,
      compilerOptions: {
        rootDir: libRoot,
        declarationDir: moduleDistPath
      }
    }

    const module = `./${path.basename(moduleMainESMFile)}`
    const main = `./${path.basename(moduleMainCJSFile)}`
    const types = `./${path.basename(moduleMainTypesFile)}`

    const configPackageJson = {
      baseContents: () => ({
        name: moduleFullName,
        version: pkgGlobal.version,
        module,
        main,
        types,
        type: "module",
        exports: {
          '.': {
            import: module,
            require: main,
            types: types,
          }
        },
      })
    }

    return [
      {
        input: modulePublicApiPath,
        output: {
          dir: path.dirname(moduleMainESMFile),
          entryFileNames: '[name].[format].js',
          name: moduleFullName,
          format: 'esm',
          sourcemap: true
        },
        plugins: [
          typescript(typescriptConfig),
          resolve(),
          commonjs(),
          dynamicImportVars(),
          renameOutput(nameReplace),
        ]
      },
      {
        input: modulePublicApiPath,
        output: {
          dir: path.dirname(moduleMainCJSFile),
          entryFileNames: '[name].[format].js',
          name: moduleFullName,
          format: 'cjs',

          sourcemap: true
        },
        plugins: [
          typescript(typescriptConfig),
          resolve(),
          commonjs(),
          dynamicImportVars(),
          renameOutput(nameReplace),
          generatePackageJson(configPackageJson),
        ]
      },
      {
        input: modulePublicApiPathTypes,
        output: [
          {
            file: path.resolve(moduleDistPath, 'index.d.ts'), format: 'es'
          }
        ],
        plugins: [
          dts(),
          del({
            targets: path.resolve(moduleDistPath, 'src'),
            hook: 'buildEnd'
          })
        ],
      }
    ]
  }

  return modules.flatMap(path => buildConfig(path));
}

export function findFilesByName(baseDir, fileName) {
  function recursiveSearch(dir) {
    let results = [];
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        results = results.concat(recursiveSearch(filePath));
      } else if (file.name === fileName) {
        results.push(filePath);
      }
    }

    return results;
  }

  return recursiveSearch(baseDir);
}

function fundModules(baseDir) {
  const modulesPath = findFilesByName(
    baseDir,
    'public-api.ts'
  )
  return modulesPath.map(modulePath => ({
    modulePublicApiPath: modulePath,
    moduleName: path.basename(path.dirname(modulePath))
  }))
}

function nameReplace(fileName) {
  if (fileName.includes('.js.map')) {
    return fileName
  }
  return fileName
    .replace('public-api.es', 'index.esm')
    .replace('public-api.cjs', 'index.cjs')
}