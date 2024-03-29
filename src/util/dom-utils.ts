export function replace(element: HTMLElement, replacement: HTMLElement): void {
  // Check if the element to be replaced is in the DOM
  if (element.parentNode) {
    // Replace the element with the replacement element
    element.replaceWith(replacement);
  } else {
    console.error('The element to be replaced is not attached to the DOM.');
  }
}


export function cloneAttributes(attrs: Attr[], target: HTMLElement) {
  attrs
    .forEach(a => {
      target.setAttribute(a.nodeName, a.nodeValue ?? '');
    });
}
