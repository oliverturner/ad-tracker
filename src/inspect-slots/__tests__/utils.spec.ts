import { describe, expect, test, it } from "vitest";

import { extractFormats, formatKeyCase, parseTargets } from "../utils";

describe("formatKeyCase", () => {
  test.each([["oAds", "oAdsName", "name"]])(
    "formatKeyCase(%s, %s) => %s",
    (omit: string, str: string, expected: string) => {
      expect(formatKeyCase(omit, str)).toBe(expected);
    }
  );
});

describe("extractFormats", () => {
  it("Creates a formats property omitting nullish values", () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      formatsDefault: undefined,
      formatsSmall: "small",
      formatsMedium: "medium1,medium2,medium3",
      formatsLarge: "large",
      formatsExtra: undefined,
    };

    const expected = {
      a: 1,
      b: 2,
      c: 3,
      formats: {
        small: ["small"],
        medium: ["medium1", "medium2", "medium3"],
        large: ["large"],
      },
    };

    expect(extractFormats(input)).toEqual(expected);
  });
});

describe("parseTargets", () => {
  it("Creates a targeting property", () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      targeting: "a=1;b=2;c=3",
    };
    const expected = {
      a: 1,
      b: 2,
      c: 3,
      targeting: { a: "1", b: "2", c: "3" },
    };

    expect(parseTargets(input as any)).toEqual(expected);
  });
});
