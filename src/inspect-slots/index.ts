import type { Slot, SlotRaw } from "../../types";

import { extractFormats, formatKeyCase, parseTargets } from "./utils";

export function inspectSlots() {
  function parseProps(ad: Slot): Slot {
    const obj: SlotRaw = {};
    for (const [k, v] of Object.entries(ad)) {
      const key = formatKeyCase<SlotRaw>("oAds", k);
      // @ts-ignore
      obj[key] = v;
    }

    return parseTargets(extractFormats(obj));
  }

  function init(els: NodeListOf<HTMLElement>): void {
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

    console.info("Page slots", slotConfig);
  }

  init(document.querySelectorAll(".o-ads, [data-o-ads-init]"));
}
