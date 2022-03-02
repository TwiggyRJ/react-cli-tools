import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";

function createReducer(reducerName: string) {
  const path = `./${reducerName}/`;
  const testsPath = `${path}/__tests__`;
  const interfacePrefix = `${reducerName[0].toUpperCase()}${reducerName.slice(1)}`;
  const reducerFileName = `${path}/${reducerName}.ts`;
  const reducerTestFileName = `${testsPath}/${reducerName}.spec.ts`;

  ensureDirSync(path);
  ensureDirSync(testsPath);

  const reducerString = `
export const ${reducerName}InitState: ${interfacePrefix}State = {};

export enum ${interfacePrefix}ActionType {
  Init = "init",
}

export interface ${interfacePrefix}ActionPayload {
  key: string;
  value: any;
}

export interface ${interfacePrefix}Actions {
  payload: ${interfacePrefix}ActionPayload;
  type: ${interfacePrefix}ActionType;
}

export interface ${interfacePrefix}State {}

export function ${reducerName}Reducer(
  state: ${interfacePrefix}State,
  action: ${interfacePrefix}Actions
): ${interfacePrefix}State {
  switch (action.type) {
    case ${interfacePrefix}ActionType.Init:
      return {
        ...${reducerName}InitState,
      };

    default:
      throw new Error(` + '\`Reducer action type "${action.type}" not supported\`' + `);
  }
}

  `;

  const reducerTestString = `
import {
  ${interfacePrefix}ActionType,
  ${reducerName}Reducer,
  ${reducerName}InitState,
} from "../";

describe("${reducerName}Reducer", () => {
  const dummyState = {};

  test("Handle initial setup", () => {
    const initialAction = {
      type: ${interfacePrefix}ActionType.Init,
      payload: {
        callee: '',
      },
    };

    const initialState = ${reducerName}Reducer(
      ${reducerName}InitState,
      initialAction
    );

    expect(initialState).toEqual({
      ...${reducerName}InitState,
    });
  });
});
  `;

  const index = `
export * from './${reducerName}';

  `;

  const writeReducer = Deno.writeTextFile(reducerFileName, reducerString);
  writeReducer.then(() => console.log(`Reducer created at ${reducerFileName}`));

  const writeReducerTest = Deno.writeTextFile(reducerTestFileName, reducerTestString);
  writeReducerTest.then(() => console.log(`Test created at ${reducerTestFileName}`));

  const writeIndex = Deno.writeTextFile(`./${reducerName}/index.ts`, index);
  writeIndex.then(() => console.log('Reducer index created'));
}

export default createReducer;

