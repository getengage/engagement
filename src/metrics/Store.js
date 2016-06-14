import $$ from '../utils/Utils';

class Store {

  constructor() {
    this.data = {};
  }

  get data() {
    return this.data;
  }

  set data(value) {
    return $$.extend(this.data, { data: value });
  }

}

export default Store;
