export default function(domElem, data$) {
  data$.onValue((data) => {
    domElem.innerHTML = '<div class="gecko-o-meter--value">34</div>';
  });
}
