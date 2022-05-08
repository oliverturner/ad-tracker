import type { SlotRaw, Slot, Formats, Targets } from "../../types";

/**
 * ```js
 * formatKeyCase("oAdsName", "oAds") => "name"
 * ```
 */
export function formatKeyCase<T>(omit: string, str: string): keyof T {
  str = str.slice(omit.length);
  return str.charAt(0).toLowerCase() + str.slice(1) as keyof T;
}

export function extractFormats(obj: SlotRaw): Slot {
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

  return {
    ...rest,
    formats,
  };
}

export function parseTargets(obj: Slot): Slot {
  const { targeting } = obj;
  if (targeting) {
    // @ts-ignore
    const pairs = targeting.split(";");

    const targets: Targets = {};
    for (let pair of pairs) {
      const [k, v] = pair.split("=");
      targets[k] = v;
    }

    return {
      ...obj,
      targeting: targets,
    };
  }

  return obj;
}
