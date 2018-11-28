# freeDOM

freeDOM is a JavaScript library inspired by jQuery.

## Features
* Select DOM elements and their parents/children
* Manipulate DOM element content and attributes/class
* Add and remove event listeners
* Make AJAX requests

## API
* `$l ()`

This central, global function wraps the DOM elements so that the methods below may be used on them.
* `html (string)`

Optional string parameter. If given a string argument, the nodes' `innerHTML` is replaced with the string. If no argument is given, the `innerHTML` of the first node in the `DOMNodeCollection` is given.
* `empty ()`

Clears `innerHTML` of all nodes in DOMNodeCollection.
* `remove ()`

Clears html of all nodes, and removes all nodes from `DOMNodeCollection`.
* `attr (attribute, value)`

If two arguments are given, sets the `attribute` of nodes to equal `value`.
* `addClass (class)`

Adds the given argument to class of nodes.
* `removeClass (class)`

Removes the given argument from class of nodes.
* `find (selector)`

Returns `DOMNodeCollection` of nodes matching selector.
* `children ()`

Returns `DOMNodeCollection` of all children of all nodes.
* `parent ()`

Returns `DOMNodeCollection` of all parents of all nodes.
* `on (event, callback)`

Sets event listener to nodes in `DOMNodeCollection`.
* `off`

Removes event listener from nodes in `DOMNodeCollection`.
* `$l.ajax`

Sends AJAX request and returns promise.

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

`$l.ajax`

freeDOM allows the user to send AJAX requests and receive the returned `Promise`. AJAX requests are made using vanilla JavaScript by specifying the `method`, `url`, `data`, `success`, and `error` in an `XMLHttpRequest`.

```javascript
$l.ajax = (options) => {
  const defaultRequest = {
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json'
  };

  const request = window.$l.extend(defaultRequest, options);

  return new Promise (
    function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(request.method, request.url);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(JSON.parse(xhr.response));
        }
      }
      xhr.send(JSON.stringify(request.data));
    }
  )
}
```

## Try it out!
...

## Future plans
...
