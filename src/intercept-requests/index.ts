import { processRequest } from "./utils";

export function interceptRequests() {
  let XHR = XMLHttpRequest.prototype;
  let send = XHR.send;
  let open = XHR.open;
  let counter = 0;

  function onLoad(this: any) {
    if (this.url?.includes("https://securepubads.g.doubleclick.net/gampad/ads")) {
      console.log(`ad-${++counter}`, processRequest(this.url));
    }
  }

  XHR.open = function (_method: string, url: any) {
    // @ts-ignore
    this.url = url; // the request url
    return open.apply(this, arguments as any);
  };

  XHR.send = function () {
    this.addEventListener("load", onLoad, { once: true });
    return send.apply(this, arguments as any);
  };
}
