import type { SlotRaw, Slot, Formats, Targets } from "../../types";

/**
 * ```js
 * formatKeyCase("oAds", "oAdsName") => "name"
 * ```
 */
export function formatKeyCase<T>(omit: string, str: string): keyof T {
  str = str.slice(omit.length);
  return (str.charAt(0).toLowerCase() + str.slice(1)) as keyof T;
}

export function extractFormats(rawFormats: SlotRaw): Slot["formats"] {
  const formats: Formats = {};
  for (const [k, v] of Object.entries(rawFormats)) {
    const key = formatKeyCase("formats", k);
    if (v) formats[key] = v.split(",");
  }

  return formats;
}

export function parseTargets(rawTargeting: string = ""): Slot["targeting"] {
  const targeting: Targets = {};
  const pairs = rawTargeting.split(";");
  for (let pair of pairs) {
    const [k, v] = pair.split("=");
    targeting[k] = v;
  }

  return targeting;
}

export function parseProps(ad: SlotRaw): Slot {
  const rawSlot: SlotRaw = {};
  const rawFormats: SlotRaw = {};
  let rawTargeting: string = "";
  for (const [k, v] of Object.entries(ad)) {
    const key = formatKeyCase<SlotRaw>("oAds", k);

    switch (key) {
      case "formatsDefault":
      case "formatsExtra":
      case "formatsLarge":
      case "formatsMedium":
      case "formatsSmall":
        rawFormats[key] = v;
        break;

      case "targeting":
        rawTargeting = v;
        break;

      default:
        // @ts-ignore
        rawSlot[key] = v;
        break;
    }
  }

  const formats = extractFormats(rawFormats);
  const targeting = parseTargets(rawTargeting);

  return { ...rawSlot, formats, targeting };
}
