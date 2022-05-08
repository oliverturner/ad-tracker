import type { Slot } from "../../types";

import { parseProps } from "./utils";

export function init(els: NodeListOf<HTMLElement>): Record<string, Slot> {
  const slots: Record<string, any> = {};
  for (const el of els) {
    if (el.dataset?.oAdsName) {
      slots[el.dataset.oAdsName] = { ...el.dataset };
    }
  }

  const slotConfig: Record<string, Slot> = {};
  for (const [oAdsName, adSlot] of Object.entries(slots)) {
    slotConfig[oAdsName] = parseProps(adSlot);
  }

  return slotConfig;
}

export function inspectSlots() {
  const slotEls = document.querySelectorAll<HTMLElement>(".o-ads, [data-o-ads-init]");
  const slotConfig = init(slotEls);
  console.info("Page slots", slotConfig);
}
