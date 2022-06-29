import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";
import getQuoteMark from "./lib/getQuoteMark.ts";
import getTestFileName from "./lib/getTestFileName.ts";
import readConfig from "./lib/readConfig.ts";
import { getComponentsTemplate, getTestsTemplate } from "./templates/components/index.ts";

async function createComponent(componentName: string) {
  const config = await readConfig();
  const quoteMark = getQuoteMark(config.general.quotes);
  const testFileName = getTestFileName(config.general.testFileName);

  const path = `./${componentName}/`;
  const testsPath = `${path}/__tests__`;
  const componentFileName = `${path}/${componentName}.tsx`;
  const componentTestFileName = `${testsPath}/${componentName}.${testFileName}.tsx`;

  ensureDirSync(path);
  ensureDirSync(testsPath);

  const componentString = getComponentsTemplate(componentName, quoteMark);

  const index = 
`export { default } from ${quoteMark}./${componentName}${quoteMark};
`;

  const componentTestString = getTestsTemplate(componentName, quoteMark);

  const writeComponent = Deno.writeTextFile(componentFileName, componentString);
  writeComponent.then(() => console.log(`Component created at ${componentFileName}`));

  const writeComponentTest = Deno.writeTextFile(componentTestFileName, componentTestString);
  writeComponentTest.then(() => console.log(`Test created at ${componentTestFileName}`));

  const writeIndex = Deno.writeTextFile(`./${componentName}/index.ts`, index);
  writeIndex.then(() => console.log('Component index created'));
}

export default createComponent;

