import R from 'ramda';
import currency from '../util/currency';

/**
 * Create a Gecko-O-Meter on the given DOM element with the given chart
 * @param {HTMLElement}      domElem  DOM element
 * @param {Function}         chart    Chart function
 * @param {Bacon.Observable} data     Bacon observable
 * @return {Function}                 Destroy component
 */
export default function(domElem, chart, data) {
  data = data.map(d => {
    if (d.format === 'currency') {
      return R.assoc('prefix', currency.codeToSymbol(d.unit), d);
    }

    return d;
  });

  return chart(domElem, data);
}
