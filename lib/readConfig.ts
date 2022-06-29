import { Config } from "../types/config.ts";

export default async function readConfig(): Promise<Config> {
  const decoder = new TextDecoder('utf-8');
  const file = await Deno.readFile('config.json');
  const config = JSON.parse(decoder.decode(file)) as Config;

  return config;
}
