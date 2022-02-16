import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";

function createModule(moduleName: string) {
  const moduleFolders = [
    'Components',
    'Lib',
    'Store',
    'Types',
  ];

  const baseFolderPath = `./${moduleName}`;

  moduleFolders.forEach(folder => {
    const path = `${baseFolderPath}/${folder}`;
    ensureDirSync(path);
    const writeIndex = Deno.writeTextFile(`./${path}/index.ts`, '');
    writeIndex.then(() => console.log(`${folder} index created`));
  });
}

export default createModule;
