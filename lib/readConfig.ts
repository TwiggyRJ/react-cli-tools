export default async function readConfig() {
  const decoder = new TextDecoder('utf-8');
  const file = await Deno.readFile('config.json');
  const config = JSON.parse(decoder.decode(file));

  return config;
}
