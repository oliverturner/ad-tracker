/**
 * @typedef {import("../../types").Slot} Slot
 * @typedef {import("../../types").SlotRaw} SlotRaw
 */

import { extractFormats, formatKeyCase, parseTargets } from "./utils";

export function inspectSlots() {

  /**
   * @param {Slot} ad
   */
  function parseProps(ad) {
    /** @type {SlotRaw} */
    const obj = {};
    for (const [k, v] of Object.entries(ad)) {
      const key = formatKeyCase("oAds", k);
      obj[key] = v;
    }

    return parseTargets(extractFormats(obj));
  }

  /**
   * @param {NodeListOf<HTMLElement>} els
   */
  function init(els) {
    const slots = {};
    for (const el of els) {
      slots[el.dataset.oAdsName] = { ...el.dataset };
    }

    const slotConfig = {};
    for (const [oAdsName, adSlot] of Object.entries(slots)) {
      slotConfig[oAdsName] = parseProps(adSlot);
    }

    console.info("Page slots", slotConfig);
  }

  init(document.querySelectorAll(".o-ads, [data-o-ads-init]"));
}
