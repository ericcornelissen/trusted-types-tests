// SPDX-License-Identifier: MPL-2.0

let policy;
let trustedElement, trustedHtml, trustedScript, trustedScriptURL;

if (hasTrustedTypes()) {
  policy = trustedTypes.createPolicy("test-policy", {
    createHTML: (input) => input,
    createScript: (input) => input,
    createScriptURL: (input) => input,
  });

  trustedElement = document.createElement("trusted");
  trustedHtml = policy.createHTML("trusted");
  trustedScript = policy.createScript("trusted");
  trustedScriptURL = policy.createScriptURL("trusted");
}
