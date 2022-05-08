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

// Poll the DOM to see if it's ready
function checkForDOM() {
  document.body && document.head ? appendScripts() : requestIdleCallback(checkForDOM);
}

requestIdleCallback(checkForDOM);
