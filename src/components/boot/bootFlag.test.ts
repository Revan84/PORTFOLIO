import { describe, expect, it } from "vitest";
import { BOOT_FLAG_SCRIPT } from "./bootFlag";

describe("BOOT_FLAG_SCRIPT", () => {
  it("contains nothing React would escape inside a <script>", () => {
    expect(BOOT_FLAG_SCRIPT).not.toMatch(/["'&<>]/);
  });

  it("is valid JavaScript", () => {
    expect(() => new Function(BOOT_FLAG_SCRIPT)).not.toThrow();
  });
});
