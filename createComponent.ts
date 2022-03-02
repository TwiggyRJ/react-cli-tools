import {
  ensureDirSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";

function createComponent(componentName: string) {
  const path = `./${componentName}/`;
  const testsPath = `${path}/__tests__`;
  const componentFileName = `${path}/${componentName}.tsx`;
  const componentTestFileName = `${testsPath}/${componentName}.spec.tsx`;

  ensureDirSync(path);
  ensureDirSync(testsPath);

  const componentString = `
import React from 'react';

interface Props {};

const ${componentName}: React.FC<Props> = () => {
  return (<></>);
};

export default ${componentName};

  `;

  const index = `
export { default } from './${componentName}';

  `;

  const componentTestString = `
import { render } from '@testing-library/react';
import ${componentName} from '../';

describe('${componentName}', () => {
  it('renders', () => {
    render(
      <${componentName} />
    );

    expect(true).toBeTruthy();
  });
});

  `;

  const writeComponent = Deno.writeTextFile(componentFileName, componentString);
  writeComponent.then(() => console.log(`Component created at ${componentFileName}`));

  const writeComponentTest = Deno.writeTextFile(componentTestFileName, componentTestString);
  writeComponentTest.then(() => console.log(`Test created at ${componentTestFileName}`));

  const writeIndex = Deno.writeTextFile(`./${componentName}/index.ts`, index);
  writeIndex.then(() => console.log('Component index created'));
}

export default createComponent;

