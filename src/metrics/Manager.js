import operative from 'operative';

class Manager {

  constructor() {
    operative({
      something: 123,
      doStuff() {
        this.something += 456;
      },
    });
  }

}

export default Manager;
