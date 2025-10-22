// SPDX-License-Identifier: MPL-2.0

function hasServiceWorker() {
  return "serviceWorker" in navigator;
}

if (hasServiceWorker()) {
  async function setupServiceWorker() {
    const scope = window.location.host.includes("github.io")
      ? "/trusted-types-tests/"
      : "/";

    try {
      const script = policy.createScriptURL("service-worker.js");
      await navigator.serviceWorker.register(script, { scope });
    } catch (error) {
      console.error("Failed to register service worker", error);
    }
  }

  setupServiceWorker();
}
