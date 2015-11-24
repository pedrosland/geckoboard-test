/**
 * Create a Gauge on the given DOM Element
 *
 * @param {HTMLElement}      domElem  DOM element
 * @param {Bacon.Observable} data$    Data stream
 * @return {Function}                 Destroy component
 */
export default function(domElem, data$) {
  const destroy = data$.onValue(data => {
    // FIXME: security
    const prefix = data.prefix || '';
    domElem.innerHTML = '<div class="gecko-o-meter--value">' + prefix + data.value + '</div>';
  });

  return function() {
    destroy();
    domElem.innerHTML = '';
  };
}
