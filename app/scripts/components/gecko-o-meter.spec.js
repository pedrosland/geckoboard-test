/* eslint-env jasmine, browser */

import chart from './gecko-o-meter';
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

    chart(div, Bacon.constant(data));

    expect($('.gecko-o-meter--value', div).text()).toBe(String(data.value));
  });
});
