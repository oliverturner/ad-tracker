function interceptRequests() {
    const requestMap = new Map();
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
    function processRequest(url) {
        const reqUrl = new URL(url);
        const allParams = Object.fromEntries(reqUrl.searchParams);
        const { cookie, correlator, prev_iu_szs, prev_scp, us_privacy, cust_params, ...other } = allParams;
        return {
            prev_iu_szs,
            prev_scp,
            us_privacy,
            cust_params: processCustParams(cust_params),
            other,
        };
    }
    function onLoad() {
        const requestUrl = requestMap.get(this);
        if (requestUrl) {
            console.log(`ad-${++counter}`, processRequest(requestUrl));
        }
    }
    XHR.open = function (_method, url) {
        if (url?.includes("https://securepubads.g.doubleclick.net/gampad/ads")) {
            requestMap.set(this, url);
        }
        return open.apply(this, arguments);
    };
    XHR.send = function () {
        this.addEventListener("load", onLoad, { once: true });
        return send.apply(this, arguments);
    };
    return {
        processRequest,
        processCustParams,
    };
}

function appendScripts() {
    const script = document.createElement("script");
    script.innerHTML = `(${interceptRequests})()`;
    document.head.prepend(script);
}
function checkForDOM() {
    document.body && document.head ? appendScripts() : requestIdleCallback(checkForDOM);
}
requestIdleCallback(checkForDOM);
//# sourceMappingURL=intercept-requests.js.map
