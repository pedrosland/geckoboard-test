import Bacon from 'baconjs';
import request from './request';

const url = 'https://widgister.herokuapp.com/challenge/frontend';

// Sample data
export var sample = Bacon.later(500, {
  value: 34,
  min: 0,
  max: 200,
  format: 'currency',
  unit: 'GBP'
});

/**
 * Poll the API every second.
 *
 * Note that this is an observable and it is lazy so just returning it is OK.
 *
 * @return {Bacon.Observable} Polling data source
 */
export var poll = Bacon.once(-1)
  .merge(Bacon.interval(2000))
  .flatMapLatest(() => {
    return request(url);
  });
