/* eslint-env jasmine, browser */

import currency from './currency';
import R from 'ramda';

describe('currency util', () => {
  const symbolTests = {
    GBP: '£',
    USD: '$'
  };

  it('returns correct currency symbol', () => {
    R.forEach(code => {
      let symbol = symbolTests[code];

      expect(currency.codeToSymbol(code)).toBe(symbol);
    }, R.keys(symbolTests));
  });
});
