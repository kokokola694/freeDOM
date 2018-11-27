class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html (input) {
    if (typeof input === "string") {
      this.nodes.forEach(node => node.innerHTML = input);
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty () {
    this.html('');
  }

  append (input) {
    if (input.constructor.name === "DOMNodeCollection") {
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = 0; j < input.nodes.length; j++) {
          this.nodes[i].innerHTML += input.nodes[j].outerHTML;
        }
      }
    } else if (input instanceof HTMLElement) {
      this.nodes.forEach(node => node.innerHTML += input.outerHTML)
    } else if (typeof input === "string") {
      this.nodes.forEach(node => node.innerHTML += input);
    }
  }

  attr (attribute, value) {
    if (value) {
      this.nodes.forEach(node => node.setAttribute(attribute, value));
    } else {
      return this.nodes[0].getAttribute(attribute);
    }
  }

  addClass(classStr){
    this.nodes.forEach(node => node.classList.add(classStr));
  }

  removeClass(classStr) {
    this.nodes.forEach(node => node.classList.remove(classStr));
  }

  children () {
    const child = [];
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes[i].children.length; j++) {
        child.push(this.nodes[i].children[j]);
      }
    }
    return new DOMNodeCollection(child);
  }

  parent () {
    const parents = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (!parents.includes(this.nodes[i].parentNode)) {
        parents.push(this.nodes[i].parentNode);
      }
    }
    return new DOMNodeCollection(parents);
  }

  find (selector) {
    const nodes = [];
    this.nodes.forEach(node => {
        node.querySelectorAll(selector).forEach(selected => nodes.push(selected));
    });
    return new DOMNodeCollection(nodes);
  }

  remove () {
    this.nodes.forEach(node => node.outerHTML = "");
    this.nodes = [];
  }

  on (eventName, callback) {
    this.nodes.forEach(node => {
      node.addEventListener(eventName, callback);
      node.listener = callback;
    })
  }

  off (eventName) {
    this.nodes.forEach(node => {
      node.removeEventListener(eventName, node.listener);
      node.listener = null;
    })
  }
}

module.exports = DOMNodeCollection;
