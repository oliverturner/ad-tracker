import type { AdRequest, AdRequestCustParams } from "../../types";

export function interceptRequests() {
  const requestMap = new Map<XMLHttpRequest, string>();
  let XHR = XMLHttpRequest.prototype;
  let send = XHR.send;
  let open = XHR.open;
  let counter = 0;

  function processCustParams(cust_params: string): AdRequestCustParams {
    const custValues = new URLSearchParams(cust_params);
    const {
      device_spoor_id,
      guid,
      loggedIn,
      permutive,
      "permutive-id": permutiveId,
      ...other
    } = Object.fromEntries(custValues);

    return {
      device_spoor_id,
      guid,
      loggedIn,
      permutive,
      permutiveId,
      other,
    };
  }

  function processRequest(url: string): AdRequest {
    const reqUrl = new URL(url);
    const allParams = Object.fromEntries(reqUrl.searchParams);

    const { cookie, correlator, prev_iu_szs, prev_scp, us_privacy, cust_params, ...other } =
      allParams;

    return {
      prev_iu_szs,
      prev_scp,
      us_privacy,
      cust_params: processCustParams(cust_params),
      other,
    };
  }

  function onLoad(this: XMLHttpRequest) {
    const requestUrl = requestMap.get(this);
    if (requestUrl) {
      console.log(`ad-${++counter}`, processRequest(requestUrl));
    }
  }

  XHR.open = function (_method: string, url: string) {
    if (url?.includes("https://securepubads.g.doubleclick.net/gampad/ads")) {
      requestMap.set(this, url);
    }
    return open.apply(this, arguments as any);
  };

  XHR.send = function () {
    this.addEventListener("load", onLoad, { once: true });
    return send.apply(this, arguments as any);
  };

  return {
    processRequest,
    processCustParams,
  }
}
