export enum Quotes {
  double = "double",
  single = "single"
}

export enum TestFileNames {
  test = "test",
  spec = "spec"
}

export interface Config {
  general: {
    quotes: Quotes;
    testFileName: TestFileNames;
  };
  module: {
    parent: string;
    folders: string[];
  }
}