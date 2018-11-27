const DOMNodeCollection = require('./dom_node_collection');
let loaded = false;
const functionQueue = [];

window.$l = (arg) => {
  if (typeof arg === "function") {
    if (!loaded) {
      functionQueue.push(arg);
    } else {
      arg();
    }
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
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
  loaded = true;
  functionQueue.forEach(func => func());
});
