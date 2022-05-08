export function interceptRequests() {
    let XHR = XMLHttpRequest.prototype;
    let send = XHR.send;
    let open = XHR.open;
    let counter = 0;
    function processCustParams(cust_params) {
        const custValues = new URLSearchParams(cust_params);
        const { device_spoor_id, guid, loggedIn, permutive, "permutive-id": permutiveId, ...other } = Object.fromEntries(custValues);
        return {
            device_spoor_id,
            guid,
            loggedIn,
            permutive,
            permutiveId,
            other,
        };
    }
    function onLoad() {
        if (this.url?.includes("https://securepubads.g.doubleclick.net/gampad/ads")) {
            const reqUrl = new URL(this.url);
            const allParams = Object.fromEntries(reqUrl.searchParams);
            const { cookie, correlator, prev_iu_szs, prev_scp, us_privacy, cust_params, ...other } = allParams;
            const data = {
                prev_iu_szs,
                prev_scp,
                us_privacy,
                cust_params: processCustParams(cust_params),
                other,
            };
            console.log(`ad-${++counter}`, data);
        }
    }
    XHR.open = function (_method, url) {
        // @ts-ignore
        this.url = url; // the request url
        return open.apply(this, arguments);
    };
    XHR.send = function () {
        this.addEventListener("load", onLoad, { once: true });
        return send.apply(this, arguments);
    };
}
