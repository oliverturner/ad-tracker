import type { SlotRaw, Slot, Formats, Targets } from "../../types";

/**
 * ```js
 * formatKeyCase("oAdsName", "oAds") => "name"
 * ```
 */
export function formatKeyCase<T>(omit: string, str: string): keyof T {
  str = str.slice(omit.length);
  return (str.charAt(0).toLowerCase() + str.slice(1)) as keyof T;
}

export function extractFormats(obj: SlotRaw): Slot["formats"] {
  const {
    formatsDefault,
    formatsExtra,
    formatsLarge,
    formatsMedium,
    formatsSmall,
    ...rest
  } = obj;
  const rawFormats = {
    formatsDefault,
    formatsExtra,
    formatsLarge,
    formatsMedium,
    formatsSmall,
  };

  const formats: Formats = {};
  for (const [k, v] of Object.entries(rawFormats)) {
    const key = formatKeyCase("formats", k);
    if (v) formats[key] = v.split(",");
  }

  return formats;
}

export function parseTargets(obj: SlotRaw): Slot["targeting"] {
  if (obj.targeting) {
    // @ts-ignore
    const pairs = obj.targeting.split(";");

    const targeting: Targets = {};
    for (let pair of pairs) {
      const [k, v] = pair.split("=");
      targeting[k] = v;
    }

    return targeting;
  }
}

export function parseProps(ad: SlotRaw): Slot {
  const obj: SlotRaw = {};
  for (const [k, v] of Object.entries(ad)) {
    const key = formatKeyCase<SlotRaw>("oAds", k);
    // @ts-ignore
    obj[key] = v;
  }

  const formats = extractFormats(obj);
  const targeting = parseTargets(obj);

  return { ...obj, formats, targeting };
}
