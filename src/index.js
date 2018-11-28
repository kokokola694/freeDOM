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

document.addEventListener("DOMContentLoaded", function(){
  docLoaded = true;
  functionQueue.forEach(func => func());
});
