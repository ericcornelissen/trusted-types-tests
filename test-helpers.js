// SPDX-License-Identifier: MPL-2.0

const $COVERED = document.getElementById("covered");
const $CAUGHT = document.getElementById("caught");
const $UNCOVERED = document.getElementById("uncovered");
const $SHADOW = document.getElementById("shadow").attachShadow({ mode: "open" });

const UNTRUSTED = "foobar";
const UNTRUSTED_URL = "https://example.com/";
const UNTRUSTED_JS_URL = "javascript:1+1";

function createTestAttribute(attributeName) {
  const attr = document.createAttribute(attributeName);
  return attr;
}

function createTestElement(tagName) {
  const $el = document.createElement(tagName);
  $SHADOW.appendChild($el);
  return $el;
}

async function testAndReport(name, cb) {
  const { promise, resolve } = Promise.withResolvers();

  const $outcome = document.createElement("p");
  $outcome.innerText = `\`${name}\` - `;

  const NOT_COVERED = 0, COVERED = 1, ERRORED = 2;
  let outcome = null;

  const securitypolicyviolation = () => outcome = {status: COVERED};
  window.addEventListener("securitypolicyviolation", securitypolicyviolation);

  setTimeout(() => {
    window.removeEventListener("securitypolicyviolation", securitypolicyviolation);

    switch (outcome.status) {
      case NOT_COVERED:
        $outcome.innerText += "not covered";
        $outcome.classList.add("not-covered");
        $UNCOVERED.appendChild($outcome);
        break;
      case COVERED: {
        $outcome.innerText += "covered";
        $outcome.classList.add("covered");
        $COVERED.appendChild($outcome);
        break;
      }
      case ERRORED: {
        const $message = document.createElement("i");
        $message.innerText = outcome.message.toString();
        $outcome.appendChild($message);
        $outcome.classList.add("other");
        $CAUGHT.appendChild($outcome);
        break;
      }
      default: {
        const $message = document.createElement("i");
        $message.innerText = 'Undecided';
        $outcome.appendChild($message);
        $outcome.classList.add("other");
        $CAUGHT.appendChild($outcome);
        break;
      }
    }

    resolve();
  }, 2);

  try {
    cb();
    outcome = {status: NOT_COVERED};
  } catch (error) {
    if (error.message.includes("requires 'Trusted")) {
      outcome = {status: COVERED};
    } else {
      outcome = {status: ERRORED, message: error.message};
    }
  }

  return promise;
}
