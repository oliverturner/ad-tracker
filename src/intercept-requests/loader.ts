import { interceptRequests } from "./index.js";

/**
 * We need to inject this script into the window to get access to context in
 * which the XMLHttpRequests are being made
 */
function appendScripts() {
  const script = document.createElement("script");
  script.innerHTML = `(${interceptRequests})()`;
  document.head.prepend(script);
}

/**
 * Running at `document_start` means we need to poll the DOM for readiness
 */
function checkForDOM() {
  document.body && document.head ? appendScripts() : requestIdleCallback(checkForDOM);
}

requestIdleCallback(checkForDOM);
