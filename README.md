# freeDOM

freeDOM is a JavaScript library inspired by jQuery.

## Features
* Select DOM elements and their parents/children
* Manipulate DOM element content and attributes/class
* Add and remove event listeners
* Make AJAX requests

## API
* `$l`
* `html`
* `empty`
* `remove`
* `attr`
* `addClass`
* `removeClass`
* `find`
* `children`
* `parent`
* `on`
* `off`
* `$l.ajax`

## Highlights
### `$l`
This is the core function of the library that provides multiple utilities:
* Selects nodes from the page using CSS selectors and returns them in a `DOMNodeCollection` (a custom class representing the nodes in an array)
* Accepts an `HTMLElement` input and returns a `DOMNodeCollection` object containing that element
* Accepts a function input, and queues it to be called after the document has been loaded

```javascript
$l = (input) => {
  if (typeof input === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(input)))
  } else if (input instanceof HTMLElement) {
    return new DOMNodeCollection([input]);
  } else if (typeof input === "function") {
    if (!docLoaded) {
      functionQueue.push(input);
    } else {
      input();
    }
  }
};
```
