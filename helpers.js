function createTestAttribute(attributeName) {
  const attr = document.createAttribute(attributeName);
  return attr;
}

function createTestElement(tagName) {
  const $el = document.createElement(tagName);
  shadow.appendChild($el);
  return $el;
}

function hasTrustedTypes() {
  return typeof trustedTypes !== "undefined";
}
