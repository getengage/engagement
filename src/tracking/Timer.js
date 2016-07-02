import { Adapters } from '../utils/';

class Timer {

  constructor() {
    this.timerSeriesX = [];
    this.timerSeriesY = [];
  }

  update() {
    this.timerSeriesX.push(window.performance.now());
    this.timerSeriesY.push(window.document[Adapters.vhidden]);
  }

  toJSON() {
    return {
      x: JSON.stringify(this.timerSeriesX),
      y: JSON.stringify(this.timerSeriesY),
    };
  }

}

export default Timer;
