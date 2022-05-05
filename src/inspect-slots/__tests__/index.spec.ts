import type { SpyInstance } from "vitest";
import { vi, describe, it, expect, beforeAll, afterAll } from "vitest";

import { inspectSlots } from "..";
import { getExpectedSlotConfig, mockSlotHTML } from "./_helpers";

describe("Inspect slots", () => {

  let infoSpy: SpyInstance<any[], void>;

  beforeAll(() => {
    infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  });

  afterAll(() => {
    infoSpy.mockClear();
  });

  it("Handles the null case", () => {
    inspectSlots();
    expect(infoSpy).toHaveBeenCalledWith("Page slots", {});
  });

  it("Parses properties", () => {
    const slotNum = 4;
    const mockHtml = Array.from({ length: slotNum }, (_, i) => mockSlotHTML(i)).join("");
    document.body.innerHTML = mockHtml;

    inspectSlots();

    const expectedOutput = getExpectedSlotConfig(slotNum);
    expect(infoSpy).toHaveBeenCalledWith("Page slots", expectedOutput);
  });
});
