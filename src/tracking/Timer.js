import { Adapters } from '../utils/';

class Timer {

  constructor() {
    this.created_at = Date.now();
    this.timerSeriesX = [];
    this.timerSeriesY = [];
  }

  update() {
    this.timerSeriesX.push(window.performance.now());
    this.timerSeriesY.push(window.document[Adapters.vhidden]);
  }

}

export default Timer;
