export function inspectSlots() {
  function formatKeyCase(omit, str) {
    str = str.slice(omit.length);
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  function extractFormats(obj) {
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

  function parseTargets(obj) {
    const { targeting } = obj;
    if (targeting) {
      const pairs = targeting.split(";");
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

  function parseProps(ad) {
    const obj = {};
    for (const [k, v] of Object.entries(ad)) {
      const key = formatKeyCase("oAds", k);
      obj[key] = v;
    }

    return parseTargets(extractFormats(obj));
  }

  function init() {
    /** @type {NodeListOf<HTMLElement>} */
    const els = document.querySelectorAll(".o-ads, [data-o-ads-init]");

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

  init();
}
