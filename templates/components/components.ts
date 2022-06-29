function getComponentsTemplate(componentName: string, quoteMark: string) {
  return `import React from ${quoteMark}react${quoteMark};

interface Props {};

const ${componentName}: React.FC<Props> = () => {
  return (<></>);
};

export default ${componentName};
`;
}

export default getComponentsTemplate;
  