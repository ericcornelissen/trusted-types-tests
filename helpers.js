// SPDX-License-Identifier: MPL-2.0

const $COVERED = document.getElementById("covered");
const $CAUGHT = document.getElementById("caught");
const $UNCOVERED = document.getElementById("uncovered");
const $SHADOW = document.getElementById("shadow").attachShadow({ mode: "open" });

const UNTRUSTED = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "number":
        return 1;
      case "string":
        return "foobar";
      default:
        throw new Error(`unknown hint: ${hint}`);
    }
  },
};

function createTestAttribute(attributeName) {
  const attr = document.createAttribute(attributeName);
  return attr;
}

function createTestElement(tagName) {
  const $el = document.createElement(tagName);
  $SHADOW.appendChild($el);
  return $el;
}

function hasTrustedTypes() {
  return typeof trustedTypes !== "undefined";
}

function testAndReport(name, cb) {
  const $outcome = document.createElement("p");
  $outcome.innerText = `\`${name}\` - `;

  try {
    cb();

    $outcome.innerText += "not covered";
    $outcome.classList.add("not-covered");
    $UNCOVERED.appendChild($outcome);
  } catch (error) {
    if (error.message.includes("requires 'Trusted")) {
      $outcome.innerText += "covered";
      $outcome.classList.add("covered");
      $COVERED.appendChild($outcome);
    } else {
      const $message = document.createElement("i");
      $message.innerText = `${error.message}`;
      $outcome.appendChild($message);
      $outcome.classList.add("other");
      $CAUGHT.appendChild($outcome);
    }
  }
}
