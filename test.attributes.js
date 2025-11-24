// SPDX-License-Identifier: MPL-2.0

let baseObject = HTMLElement;
const $btn = document.getElementById("full-coverage");

if (hasTrustedTypes()) {
  await test();
  $btn.disabled = false;
} else {
  document.getElementById("no-trusted-types").hidden = false;
}

$btn.addEventListener("click", async () => {
  $btn.disabled = true;

  // Change the base object in order to cover all attributes
  baseObject = Object;

  // Reset the results
  $COVERED.innerText = "";
  $CAUGHT.innerText = "";
  $UNCOVERED.innerText = "";

  // Re-run the tests
  await test();
});

// ---

async function test() {
  for (const elementClass of getHTMLElements()) {
    const tagName = elementClassToTagName(elementClass);
    const el = createTestElement(tagName);
    for (const attr of getElementAttributeProperties(el)) {
      const cases = [
        {
          name: () => `${elementClass}.${attr}=.`,
          test: () => el[attr] = UNTRUSTED,
        },
        {
          name: () => `${elementClass}.setAttribute('${attr}', .)`,
          test: () => el.setAttribute(attr, UNTRUSTED),
        },
        {
          name: () => `${elementClass}.setAttributeNS('', '${attr}', .)`,
          test: () => el.setAttributeNS("", attr, UNTRUSTED),
        },
        {
          name: () => `${elementClass}.setAttributeNS('ns', '${attr}', .)`,
          test: () => el.setAttributeNS("ns", attr, UNTRUSTED),
        },
        {
          name: () => `document.createAttribute('${attr}').value=.`,
          test: () => {
            const attribute = document.createAttribute(attr);
            attribute.value = UNTRUSTED;
          },
        },
        {
          name: () => `document.createAttributeNS('', '${attr}').value=.`,
          test: () => {
            const attribute = document.createAttributeNS("", attr);
            attribute.value = UNTRUSTED;
          },
        },
        {
          name: () => `document.createAttributeNS('ns', '${attr}').value=.`,
          test: () => {
            const attribute = document.createAttributeNS("ns", attr);
            attribute.value = UNTRUSTED;
          },
        },
        {
          name: () => `${elementClass}.setAttributeNode([${attr}])`,
          test: () => {
            const attribute = document.createAttribute(attr);
            attribute.value = UNTRUSTED;
            el.setAttributeNode(attribute);
          },
        },
      ];

      for (const tc of cases) {
        await testAndReport(tc.name(), tc.test);
      }
    }
  }
}

function elementClassToTagName(element) {
  const tagName = element
    .replace(/^HTML/, "")
    .replace(/Element$/, "")
    .toLowerCase();

  const corrections = {
    anchor: "a",
    dlist: "dl",
    olist: "ol",
    ulist: "ul",
  };
  if (Object.hasOwn(corrections, tagName)) {
    return corrections[tagName];
  }

  return tagName;
}

function getHTMLElements() {
  return Reflect.ownKeys(window)
    .filter(key => {
      const value = window[key];
      return typeof value === "function" &&
        value.prototype instanceof HTMLElement &&
        key.startsWith("HTML");
    })
    .toSorted();
}

function getElementAttributeProperties(element) {
  const properties = new Set();

  let proto = Object.getPrototypeOf(element);
  while (proto && proto !== baseObject.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);
      if (!descriptor) {
        continue;
      }

      if (!descriptor.set && !descriptor.writable) {
        continue;
      }

      if (typeof element[key] === "function") {
        continue;
      }

      properties.add(key);
    }

    proto = Object.getPrototypeOf(proto);
  }

  return properties;
}
