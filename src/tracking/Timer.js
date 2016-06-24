import { Adapters } from '../utils/';

class Timer {

  constructor() {
    this.created_at = Date.now();
    this.timerSeriesX = [];
    this.timerSeriesY = [];
  }

  update() {
    this.timerSeriesX.push(performance.now());
    this.timerSeriesY.push(Adapters.vhidden);
  }

}

export default Timer;
