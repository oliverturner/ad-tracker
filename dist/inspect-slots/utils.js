/**
 * ```js
 * formatKeyCase("oAdsName", "oAds") => "name"
 * ```
 */
export function formatKeyCase(omit, str) {
    str = str.slice(omit.length);
    return str.charAt(0).toLowerCase() + str.slice(1);
}
export function extractFormats(obj) {
    const { formatsDefault, formatsExtra, formatsLarge, formatsMedium, formatsSmall, ...rest } = obj;
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
        if (v)
            formats[key] = v.split(",");
    }
    return {
        ...rest,
        formats,
    };
}
export function parseTargets(obj) {
    const { targeting } = obj;
    if (targeting) {
        // @ts-ignore
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
