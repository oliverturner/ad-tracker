import { describe, it, expect, beforeAll } from "vitest";

import type { Slot } from "../../../types";
import { init } from "..";

function getSlot(index: number): string {
  return /* html */ `<div
    class="o-ads o-ads--transition o-ads--center"
    data-o-ads-name="o-ads-name-${index}"
    data-o-ads-formats-default="MediumRectangle,Responsive,Collapse"
    data-o-ads-init="true"
    data-o-ads-label="true"
    data-o-ads-targeting="pos=native;image=hidden"
    tabindex="-1"
    aria-hidden="true"
  ></div>`;
}

describe("Inspect slots", () => {
  let slotConfig: Record<string, Slot>;

  beforeAll(() => {
    const html = Array.from({ length: 4 }, (_, i) => getSlot(i)).join("");
    document.body.innerHTML = html;
    const slotEls = document.querySelectorAll<HTMLDivElement>("[data-o-ads-init]");
    slotConfig = init(slotEls);
  });

  it("indexes by oAdsName", () => {
    expect(Object.keys(slotConfig)).toEqual([
      "o-ads-name-0",
      "o-ads-name-1",
      "o-ads-name-2",
      "o-ads-name-3",
    ]);
  });

  it("Parses properties", () => {
    expect(slotConfig["o-ads-name-0"]).toEqual({
      name: "o-ads-name-0",
      init: "true",
      label: "true",
      targeting: { image: "hidden", pos: "native" },
      formats: {
        default: ["MediumRectangle", "Responsive", "Collapse"],
      },
    });
  });
});
