import { interceptRequests } from "./intercept-requests";
import { inspectSlots } from "./inspect-slots";

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
