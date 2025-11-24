// SPDX-License-Identifier: MPL-2.0

function hasTrustedTypes() {
  return typeof trustedTypes !== "undefined";
}

function hasServiceWorker() {
  return "serviceWorker" in navigator;
}
