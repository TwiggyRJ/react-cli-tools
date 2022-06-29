import { TestFileNames } from "../types/config.ts";

export default function getTestFileName(setting: TestFileNames): string {
  return setting === TestFileNames.test ? 'test' : 'spec';
}
