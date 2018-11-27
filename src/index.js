const DOMNodeCollection = require('./dom_node_collection');
let docLoaded = false;
const functionQueue = [];

window.$l = (input) => {
  if (typeof input === "function") {
    if (!docLoaded) {
      functionQueue.push(input);
    } else {
      input();
    }
  } else if (input instanceof HTMLElement) {
    return new DOMNodeCollection([input]);
  } else if (typeof input === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(input)));
  }
};

window.$l.extend = (...args) => {
  let merged = args[0];
  args.slice(1).forEach(arg => Object.assign(merged, arg));
  return merged;
}

window.$l.ajax = (options) => {
  const defaultReq = {
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const request = window.$l.extend(defaultReq, options);
  const xhr = new XMLHttpRequest();
  xhr.open(request.method, request.url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      request.success(xhr.response);
    } else {
      request.error(xhr.response);
    }
  }
  xhr.send(JSON.stringify(request.data));
}

document.addEventListener("DOMContentLoaded", function(){
  docLoaded = true;
  functionQueue.forEach(func => func());
});
