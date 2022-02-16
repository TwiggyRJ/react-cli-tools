import yargs from 'https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts';
import createComponent from "./createComponent.ts";
import createModule from "./createModule.ts";

enum Create {
  Component = "component",
  Module = "module",
}

interface Arguments {
  create: Create;
  name: string;
}

let inputArgs: Arguments = yargs(Deno.args)
  .alias('c', 'create')
  .alias('n', 'name').argv;

if (inputArgs.create === Create.Component) {
  createComponent(inputArgs.name);
}

switch (inputArgs.create) {
  case Create.Component:
    createComponent(inputArgs.name);
    break;

  case Create.Module:
    createModule(inputArgs.name);
    break;

  default:
    break;
}
