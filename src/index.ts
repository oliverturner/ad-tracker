import { interceptRequests } from "./intercept-requests/index.js";
import { inspectSlots } from "./inspect-slots/index.js";

function appendScripts() {
  const script = document.createElement("script");
  script.innerHTML = `
    ${inspectSlots}
    (${interceptRequests})()
  `;

  document.head.prepend(script);
}

// Poll the DOM to see if it's ready
function checkForDOM() {
  document.body && document.head
    ? appendScripts()
    : requestIdleCallback(checkForDOM);
}

requestIdleCallback(checkForDOM);
