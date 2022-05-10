import type { Slot } from "../../types";

import { parseProps } from "./utils";

export function getSlotConfig(els: NodeListOf<HTMLElement>): Record<string, Slot> {
  const slots: Record<string, any> = {};
  let counter = 0;
  for (const el of els) {
    // Generate an id for the slot: we rely on `data-o-ads-name` being set
    const slotId = `ad-slot-${counter++}`;
    slots[slotId] = { ...el.dataset };
  }

  const slotConfig: Record<string, Slot> = {};
  for (const [oAdsName, adSlot] of Object.entries(slots)) {
    slotConfig[oAdsName] = parseProps(adSlot);
  }

  return slotConfig;
}

export function inspectSlots(): void {
  const slotEls = document.querySelectorAll<HTMLElement>(".o-ads, [data-o-ads-init]");
  const slotConfig = getSlotConfig(slotEls);
  console.info("Page slots", slotConfig);
}

export function onMessage(event: MessageEvent): void {
  // We only accept messages from ourselves
  if (event.source != window) return;

  if (event.data?.type === "INSPECT_SLOTS") {
    inspectSlots();
  }
}

window.addEventListener("message", onMessage, false);
