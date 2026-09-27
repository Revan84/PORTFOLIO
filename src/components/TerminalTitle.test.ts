import { describe, expect, it } from "vitest";
import { splitTitle } from "./TerminalTitle";

describe("splitTitle", () => {
  it("keeps the last word apart", () => {
    expect(splitTitle("HomeApp Backend")).toEqual({ lead: "HomeApp", last: "Backend" });
  });

  it("leaves the lead empty for a single word", () => {
    expect(splitTitle("HomeApp")).toEqual({ lead: "", last: "HomeApp" });
  });

  it("groups every word but the last on the first line", () => {
    expect(splitTitle("  Site for a music  association ")).toEqual({
      lead: "Site for a music",
      last: "association",
    });
  });
});
