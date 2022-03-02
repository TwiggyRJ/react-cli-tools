import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";
import { ModuleTypes } from "./types.ts";

function getModuleType(type: ModuleTypes): string[] {
  const baseModuleFolders = [
    'Components',
    'Lib',
    'Store',
    'Types',
    'Hooks'
  ];

  switch (type) {
    case ModuleTypes.Web:
      return [
        ...baseModuleFolders,
        'Pages',
      ];

    case ModuleTypes.Native:
      return [
        ...baseModuleFolders,
        'Screens',
      ];
  
    default:
      throw new Error("Unsupported Type");
  }
}

function createModule(moduleName: string, type: ModuleTypes = ModuleTypes.Web) {
  const moduleFolders = getModuleType(type);

  const baseFolderPath = `./Modules/${moduleName}`;

  moduleFolders.forEach(folder => {
    const path = `${baseFolderPath}/${folder}`;
    ensureDirSync(path);
    const writeIndex = Deno.writeTextFile(`./${path}/index.ts`, '');
    writeIndex.then(() => console.log(`${folder} index created`));
  });
}

export default createModule;
