// SPDX-License-Identifier: MPL-2.0

if (hasServiceWorker()) {
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
