function getTestsTemplate(componentName: string, quoteMark: string) {
  return `import { render } from ${quoteMark}@testing-library/react${quoteMark};
import ${componentName} from ${quoteMark}../${quoteMark};

describe(${quoteMark}${componentName}${quoteMark}, () => {
  it(${quoteMark}renders${quoteMark}, () => {
    render(
      <${componentName} />
    );

    expect(true).toBeTruthy();
  });
});
`;
}

export default getTestsTemplate;
