class $$ {

  static find(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  static extend(obj1, obj2) {
    return Object.assign(Object.create(Object.prototype), obj1, obj2);
  }

}

module.exports = $$;
