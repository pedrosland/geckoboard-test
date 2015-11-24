export default function(domElem, data$) {
  data$.onValue(data => {
    // FIXME: security
    const prefix = data.prefix || '';
    domElem.innerHTML = '<div class="gecko-o-meter--value">' + prefix + data.value + '</div>';
  });
}
