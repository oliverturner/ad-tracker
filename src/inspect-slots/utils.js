/**
 * @typedef {import("../../types").SlotRaw} SlotRaw
 * @typedef {import("../../types").Slot} Slot
 * @typedef {import("../../types").Formats} Formats
 * @typedef {import("../../types").Targets} Targets
 */

/**
 * ```js
 * formatKeyCase("oAdsName", "oAds") => "name"
 * ```
 * @param {string} omit
 * @param {string} str
 * @returns {string}
 */
export function formatKeyCase(omit, str) {
  str = str.slice(omit.length);
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * @param {SlotRaw} obj
 * @returns {Slot}
 */
export function extractFormats(obj) {
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

  /** @type {Formats} */
  const formats = {};
  for (const [k, v] of Object.entries(rawFormats)) {
    const key = formatKeyCase("formats", k);
    formats[key] = v?.split(",");
  }

  return {
    ...rest,
    formats,
  };
}

/**
 * @param {Slot} obj
 * @returns {Slot}
 */
export function parseTargets(obj) {
  const { targeting } = obj;
  if (targeting) {
    // @ts-ignore
    const pairs = targeting.split(";");

    /** @type {Targets} */
    const targets = {};
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
