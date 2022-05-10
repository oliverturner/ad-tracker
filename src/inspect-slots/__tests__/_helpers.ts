import type { Slot } from "types";

export function mockSlotHTML(index: number): string {
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

export function getExpectedSlotConfig(num: number): Record<string, Slot> {
  const getMockSlot = (index: number): Slot => ({
    name: `o-ads-name-${index}`,
    init: "true",
    label: "true",
    targeting: { image: "hidden", pos: "native" },
    formats: {
      default: ["MediumRectangle", "Responsive", "Collapse"],
    },
  });

  const expected: Record<string, Slot> = {};
  let counter = 0;
  while (counter < num) {
    expected[`ad-slot-${counter}`] = getMockSlot(counter);
    counter++
  }

  return expected;
}
