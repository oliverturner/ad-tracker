(function () {
  'use strict';

  function interceptRequests() {
    let XHR = XMLHttpRequest.prototype;
    let send = XHR.send;
    let open = XHR.open;
    let counter = 0;

    function processCustParams(cust_params) {
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

    function onLoad() {
      if (
        this.url?.includes("https://securepubads.g.doubleclick.net/gampad/ads")
      ) {
        const reqUrl = new URL(this.url);
        const allParams = Object.fromEntries(reqUrl.searchParams);

        const {
          cookie,
          correlator,
          prev_iu_szs,
          prev_scp,
          us_privacy,
          cust_params,
          ...other
        } = allParams;

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

    /**
     * @param {string} _method
     * @param {*} url
     * @returns
     */
    XHR.open = function (_method, url) {
      this.url = url; // the request url
      return open.apply(this, arguments);
    };

    XHR.send = function () {
      this.addEventListener("load", onLoad, { once: true });
      return send.apply(this, arguments);
    };
  }

  function inspectSlots() {
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

  function appendScripts() {
    const interceptScript = document.createElement("script");
    interceptScript.innerHTML = `
    // Expose the 'inspectSlots' function
    ${inspectSlots}

    // Immediately overwrite the XMLHttpRequest object
    (${interceptRequests})()
  `;

    document.head.prepend(interceptScript);
  }

  function checkForDOM() {
    document.body && document.head
      ? appendScripts()
      : requestIdleCallback(checkForDOM);
  }

  requestIdleCallback(checkForDOM);

})();
