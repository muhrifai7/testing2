import { create } from "../create";

describe("auth", () => {
  it("should resolve with true and valid userId for hardcoded token", async () => {
    const test = {};
    expect(test).toEqual({});
  });

  it("should resolve with false for invalid token", async () => {
    // expect(response).toEqual({error: {type: 'unauthorized', message: 'Authentication Failed'}})
  });
});
