import d3 from 'd3';

/**
 * Create a Gauge on the given DOM Element
 *
 * @param {HTMLElement}      domElem  DOM element
 * @param {Bacon.Observable} data$    Data stream
 * @return {Function}                 Destroy component
 */
export default function(domElem, data$) {
  const width = 500;
  const height = 500;
  const arcOuterRadius = height / 2;
  const arcInnerRadius = arcOuterRadius - 50;
  const needleWidth = 5;
  const needleLength = arcInnerRadius - needleWidth;

  // If we did convert this for server side rendering, we could still use d3.svg.arc()() for the path.
  // Scanned code and tested to confirm.
  var arc = d3.svg.arc()
    .innerRadius(arcInnerRadius)
    .outerRadius(arcOuterRadius);

  var svg = d3.select(domElem)
    .append('svg')
    .attr('class', 'chart-svg')
    .append('g');

  svg.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'red');

  // magic number 20 = adjustment for font-size: 60px;
  var value = svg.append('text')
    .attr('class', 'gauge--value')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height / 4 / 2 + 20);

  var chartG = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 4 * 3})`);

  chartG.append('path')
    .datum({startAngle: -Math.PI / 2, endAngle: Math.PI / 2})
    .attr('class', 'gauge--path1')
    .attr('d', arc);

  var needle = chartG.append('g');

  needle.append('rect')
    .attr('class', 'gauge--needle')
    .attr('rx', needleWidth / 2)
    .attr('ry', needleWidth / 2)
    .attr('width', needleWidth)
    .attr('height', needleLength)
    .attr('transform', `translate(0,${-needleLength})`);

  var scale = d3.scale.linear()
    .range([-90, 90]);

  render({
    min: 0,
    max: 1,
    value: 0
  });

  const unbind = data$.onValue(render);

  /**
   * Render chart
   * @param {Object} data  Data to render
   */
  function render(data) {
    const prefix = data.prefix || '';

    scale.domain([data.min, data.max]);

    needle.datum({angle: scale(data.value)})
      .attr('transform', d => {
        return `rotate(${d.angle})`;
      });

    value.text(prefix + data.value);
  }

  return function() {
    unbind();
    domElem.innerHTML = '';
  };
}
