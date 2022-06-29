import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";
import getQuoteMark from "./lib/getQuoteMark.ts";
import getTestFileName from "./lib/getTestFileName.ts";
import readConfig from "./lib/readConfig.ts";

async function createContext(contextName: string) {
  const config = await readConfig();
  const quoteMark = getQuoteMark(config.general.quotes);
  const testFileName = getTestFileName(config.general.testFileName);

  const testsPath = `__tests__`;
  const contextFileName = `${contextName}Context.tsx`;
  const contextTestFileName = `${testsPath}/${contextName}Context.${testFileName}.tsx`;

  ensureDirSync(testsPath);

  const contextString =
    `import React from ${quoteMark}react${quoteMark};

interface ProviderProps {};
interface StateProps {};
interface MethodsProps {};

export const ${contextName}StateContext = React.createContext<StateProps>(null);
export const ${contextName}MethodsContext = React.createContext<MethodsProps>(null);

export const ${contextName}Provider: React.FC<ProviderProps> = ({ children }) => {
  const state = {};
  const methods = {};
  
  return (
    <${contextName}StateContext.Provider value={state}>
      <${contextName}MethodsContext.Provider value={methods}>
        {children}
      </${contextName}MethodsContext.Provider>
    </${contextName}StateContext.Provider>
  );
};
`;

  const contextTestString =
    `import { render } from ${quoteMark}@testing-library/react${quoteMark};
import ${contextName} from ${quoteMark}../${quoteMark};

describe(${quoteMark}${contextName}${quoteMark}, () => {
  it(${quoteMark}renders${quoteMark}, () => {
    render();

    expect(true).toBeTruthy();
  });
});
`;

  const writeComponent = Deno.writeTextFile(contextFileName, contextString);
  writeComponent.then(() => console.log(`Context created at ${contextFileName}`));

  // const writeComponentTest = Deno.writeTextFile(contextTestFileName, contextTestString);
  // writeComponentTest.then(() => console.log(`Test created at ${contextTestFileName}`));
}

export default createContext;

