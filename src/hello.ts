import HtmlMessage from "./example-dependency";

// If needed, this can be moved to a separate file
export interface Params {
  name: string;
  place: string;
}

// TODO use async/await syntax
export default function main(params: Params): HtmlMessage {
  const {name = "stranger", place = "somewhere"} = params;

  return new HtmlMessage(`Hello, ${name} from ${place}\n`);
}

(<any>global).main = main;
