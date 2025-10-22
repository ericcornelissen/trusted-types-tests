// SPDX-License-Identifier: MPL-2.0

self.addEventListener("fetch", (event) => {
  if (isNavigation(event) && !toOtherPage(event)) {
    // Block navigation requests that are not to another HTML page in order to
    // be able to test navigation sinks for Trusted Types coverage.
    const response = new Response(null, { status: 204 });
    event.respondWith(response);
  }
});

function isNavigation(event) {
  return event.request.destination === "document";
}

function toOtherPage(event) {
  if (event.request.url.endsWith(".html")) {
    return true;
  }

  const url = new URL(event.request.url);
  if (url.pathname === "/" || url.pathname === "/trusted-types-tests/") {
    return url.search === "";
  }

  return false;
}
