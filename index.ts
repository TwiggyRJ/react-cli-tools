import yargs from 'https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts';
import createComponent from "./createComponent.ts";
import createContext from "./createContext.ts";
import createModule from "./createModule.ts";
import createReducer from "./createReducer.ts";

enum Create {
  Component = "component",
  Context = "context",
  Module = "module",
  Reducer = "reducer",
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

  case Create.Context:
    createContext(inputArgs.name);
    break;

  case Create.Module:
    createModule(inputArgs.name);
    break;

  case Create.Reducer:
    createReducer(inputArgs.name);
    break;

  default:
    break;
}
