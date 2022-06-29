import { Quotes } from "../types/config.ts";

export default function getQuoteMark(quote: Quotes): string {
  return quote === 'single' ? `'` : `"`;
}
