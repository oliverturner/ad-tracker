var inspectSlots = (function (exports) {
    'use strict';

    function formatKeyCase(omit, str) {
        str = str.slice(omit.length);
        return (str.charAt(0).toLowerCase() + str.slice(1));
    }
    function extractFormats(rawFormats) {
        const formats = {};
        for (const [k, v] of Object.entries(rawFormats)) {
            const key = formatKeyCase("formats", k);
            if (v)
                formats[key] = v.split(",");
        }
        return formats;
    }
    function parseTargets(rawTargeting = "") {
        const targeting = {};
        const pairs = rawTargeting.split(";");
        for (let pair of pairs) {
            const [k, v] = pair.split("=");
            targeting[k] = v;
        }
        return targeting;
    }
    function parseProps(ad) {
        const rawSlot = {};
        const rawFormats = {};
        let rawTargeting = "";
        for (const [k, v] of Object.entries(ad)) {
            const key = formatKeyCase("oAds", k);
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
                    rawSlot[key] = v;
                    break;
            }
        }
        const formats = extractFormats(rawFormats);
        const targeting = parseTargets(rawTargeting);
        return { ...rawSlot, formats, targeting };
    }

    function getSlotConfig(els) {
        const slots = {};
        for (const el of els) {
            if (el.dataset?.oAdsName) {
                slots[el.dataset.oAdsName] = { ...el.dataset };
            }
        }
        const slotConfig = {};
        for (const [oAdsName, adSlot] of Object.entries(slots)) {
            slotConfig[oAdsName] = parseProps(adSlot);
        }
        return slotConfig;
    }
    function inspectSlots() {
        const slotEls = document.querySelectorAll(".o-ads, [data-o-ads-init]");
        const slotConfig = getSlotConfig(slotEls);
        console.info("Page slots", slotConfig);
    }
    function onMessage(event) {
        if (event.source != window)
            return;
        if (event.data?.type === "INSPECT_SLOTS") {
            inspectSlots();
        }
    }
    window.addEventListener("message", onMessage, false);

    exports.getSlotConfig = getSlotConfig;
    exports.inspectSlots = inspectSlots;
    exports.onMessage = onMessage;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=inspect-slots.js.map
