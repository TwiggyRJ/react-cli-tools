function getHooksTemplate(hookName: string) {
  return `

interface Returns {}

function ${hookName}(): Returns {
  return {};
}

export default ${hookName};

`;
}