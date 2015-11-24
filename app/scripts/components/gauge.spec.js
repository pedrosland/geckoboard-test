/* eslint-env jasmine, browser */

import chart from './gauge';
import Bacon from 'baconjs';
import $ from 'jquery';

describe('gauge', () => {
  it('displays key figures', () => {
    var div = document.createElement('div');
    var data = {
      value: 34,
      min: 0,
      max: 200,
      prefix: '£'
    };

    chart(div, Bacon.constant(data));

    expect($('.gecko-o-meter--value', div).text()).toBe(data.prefix + data.value);
  });
});
