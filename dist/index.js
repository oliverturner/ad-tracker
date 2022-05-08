(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function processCustParams(cust_params) {
        var custValues = new URLSearchParams(cust_params);
        var _a = Object.fromEntries(custValues), device_spoor_id = _a.device_spoor_id, guid = _a.guid, loggedIn = _a.loggedIn, permutive = _a.permutive, permutiveId = _a["permutive-id"], other = __rest(_a, ["device_spoor_id", "guid", "loggedIn", "permutive", "permutive-id"]);
        return {
            device_spoor_id: device_spoor_id,
            guid: guid,
            loggedIn: loggedIn,
            permutive: permutive,
            permutiveId: permutiveId,
            other: other,
        };
    }
    function processRequest(url) {
        var reqUrl = new URL(url);
        var allParams = Object.fromEntries(reqUrl.searchParams);
        allParams.cookie; allParams.correlator; var prev_iu_szs = allParams.prev_iu_szs, prev_scp = allParams.prev_scp, us_privacy = allParams.us_privacy, cust_params = allParams.cust_params, other = __rest(allParams, ["cookie", "correlator", "prev_iu_szs", "prev_scp", "us_privacy", "cust_params"]);
        return {
            prev_iu_szs: prev_iu_szs,
            prev_scp: prev_scp,
            us_privacy: us_privacy,
            cust_params: processCustParams(cust_params),
            other: other,
        };
    }

    function interceptRequests() {
        var XHR = XMLHttpRequest.prototype;
        var send = XHR.send;
        var open = XHR.open;
        var counter = 0;
        function onLoad() {
            var _a;
            if ((_a = this.url) === null || _a === void 0 ? void 0 : _a.includes("https://securepubads.g.doubleclick.net/gampad/ads")) {
                console.log("ad-".concat(++counter), processRequest(this.url));
            }
        }
        XHR.open = function (_method, url) {
            this.url = url;
            return open.apply(this, arguments);
        };
        XHR.send = function () {
            this.addEventListener("load", onLoad, { once: true });
            return send.apply(this, arguments);
        };
    }

    function formatKeyCase(omit, str) {
        str = str.slice(omit.length);
        return (str.charAt(0).toLowerCase() + str.slice(1));
    }
    function extractFormats(rawFormats) {
        var e_1, _a;
        var formats = {};
        try {
            for (var _b = __values(Object.entries(rawFormats)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                var key = formatKeyCase("formats", k);
                if (v)
                    formats[key] = v.split(",");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return formats;
    }
    function parseTargets(rawTargeting) {
        var e_2, _a;
        if (rawTargeting === void 0) { rawTargeting = ""; }
        var targeting = {};
        var pairs = rawTargeting.split(";");
        try {
            for (var pairs_1 = __values(pairs), pairs_1_1 = pairs_1.next(); !pairs_1_1.done; pairs_1_1 = pairs_1.next()) {
                var pair = pairs_1_1.value;
                var _b = __read(pair.split("="), 2), k = _b[0], v = _b[1];
                targeting[k] = v;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (pairs_1_1 && !pairs_1_1.done && (_a = pairs_1.return)) _a.call(pairs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return targeting;
    }
    function parseProps(ad) {
        var e_3, _a;
        var rawSlot = {};
        var rawFormats = {};
        var rawTargeting = "";
        try {
            for (var _b = __values(Object.entries(ad)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                var key = formatKeyCase("oAds", k);
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
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var formats = extractFormats(rawFormats);
        var targeting = parseTargets(rawTargeting);
        return __assign(__assign({}, rawSlot), { formats: formats, targeting: targeting });
    }

    function init(els) {
        var e_1, _a, e_2, _b;
        var _c;
        var slots = {};
        try {
            for (var els_1 = __values(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
                var el = els_1_1.value;
                if ((_c = el.dataset) === null || _c === void 0 ? void 0 : _c.oAdsName) {
                    slots[el.dataset.oAdsName] = __assign({}, el.dataset);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (els_1_1 && !els_1_1.done && (_a = els_1.return)) _a.call(els_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var slotConfig = {};
        try {
            for (var _d = __values(Object.entries(slots)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), oAdsName = _f[0], adSlot = _f[1];
                slotConfig[oAdsName] = parseProps(adSlot);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return slotConfig;
    }
    function inspectSlots() {
        var slotEls = document.querySelectorAll(".o-ads, [data-o-ads-init]");
        var slotConfig = init(slotEls);
        console.info("Page slots", slotConfig);
    }

    function appendScripts() {
        var script = document.createElement("script");
        script.innerHTML = "\n    ".concat(inspectSlots, "\n    (").concat(interceptRequests, ")()\n  ");
        document.head.prepend(script);
    }
    function checkForDOM() {
        document.body && document.head
            ? appendScripts()
            : requestIdleCallback(checkForDOM);
    }
    requestIdleCallback(checkForDOM);

})();
//# sourceMappingURL=index.js.map
