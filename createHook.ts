import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";
import getQuoteMark from "./lib/getQuoteMark.ts";
import readConfig from "./lib/readConfig.ts";

async function createComponent(hookName: string) {
  const config = await readConfig();
  const quoteMark = getQuoteMark(config.general.quotes);
  
  const path = `./${hookName}/`;
  const testsPath = `${path}/__tests__`;
  const componentFileName = `${path}/${hookName}.ts`;
  const componentTestFileName = `${testsPath}/${hookName}.spec.ts`;

  ensureDirSync(path);
  ensureDirSync(testsPath);

  const componentString = `
interface Returns {};

export default function ${hookName}(): Returns {
  return null;
};
  `;

  const index = `
export { default } from ${quoteMark}./${hookName}${quoteMark};

  `;

  const componentTestString = `
import { render } from ${quoteMark}@testing-library/react${quoteMark};
import ${hookName} from ${quoteMark}../${quoteMark};

describe(${quoteMark}${hookName}${quoteMark}, () => {
  it(${quoteMark}renders${quoteMark}, () => {
    render(
      <${hookName} />
    );

    expect(true).toBeTruthy();
  });
});

  `;

  const writeComponent = Deno.writeTextFile(componentFileName, componentString);
  writeComponent.then(() => console.log(`Component created at ${componentFileName}`));

  const writeComponentTest = Deno.writeTextFile(componentTestFileName, componentTestString);
  writeComponentTest.then(() => console.log(`Test created at ${componentTestFileName}`));

  const writeIndex = Deno.writeTextFile(`./${hookName}/index.ts`, index);
  writeIndex.then(() => console.log('Component index created'));
}

export default createComponent;

