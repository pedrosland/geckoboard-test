/* eslint-env jasmine */

import gecko from './gecko-o-meter';
import chart from './gauge';
import Bacon from 'baconjs';
import $ from 'jquery';

describe('gecko-o-meter', () => {
  it('displays key figures', () => {
    var div = document.createElement('div');
    var data = {
      value: 34,
      min: 0,
      max: 200,
      format: 'currency',
      unit: 'GBP'
    };

    gecko(div, chart, Bacon.constant(data));

    expect($('.gecko-o-meter--value', div).text()).toBe('£' + data.value);
  });
});
