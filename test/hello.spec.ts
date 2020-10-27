import {Params} from "../src/hello";
import main from "../src/hello";

import {expect} from "chai";
// TODO maybe move specs beside their module?

describe("typescript-starter", function () {
  const params: Params = {
    name: "name",
    place: "place",
  };

  const sut = main(params);

  it("returns the greeting inside the message body", () => {
    expect(sut.body).to.equal(`Hello, ${params.name} from ${params.place}\n`);
  });

  it("returns the correct status code", () => {
    expect(sut.statusCode).to.equal(200);
  });
});
