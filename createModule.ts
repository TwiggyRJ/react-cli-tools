import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";
import readConfig from "./lib/readConfig.ts";
import { ModuleTypes } from "./types.ts";

async function createModule(moduleName: string, type: ModuleTypes = ModuleTypes.Web) {
  const config = await readConfig();
  const moduleFolders = config.module.folders as string[];

  const baseFolderPath = `./${config.module.parent}/${moduleName}`;

  moduleFolders.forEach(folder => {
    const path = `${baseFolderPath}/${folder}`;
    ensureDirSync(path);
    const writeIndex = Deno.writeTextFile(`./${path}/index.ts`, '');
    writeIndex.then(() => console.log(`${folder} index created`));
  });
}

export default createModule;
