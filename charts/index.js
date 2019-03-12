import * as d3 from 'd3';

const kdc = {};
kdc.models = kdc.models || {};
kdc.utils = kdc.utils || {};

/*
Charts (Each chart type will move to their own file..)
=================
 */

kdc.models.pieChart = function() {
  let margin = {top: 0, right: 0, bottom: 0, left: 0},
      showLegend = false,
      showLabels = true,
      donutRatio = 0.5,
      getX = function(d) { return d.x },
      getY = function(d) { return d.y },
      donut = false,
      color = kdc.utils.defaultColor(),
      width = 500,
      height = 500,
      container = null;

  function chart(selection) {
    selection.each(function(data) {
      let availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          radius = Math.min(availableWidth, availableHeight) / 2;

      container = d3.select(this);

      const pie = d3.pie()
          .value(function(d) { return d.value; })
          .sort(null);

      const arc = d3.arc()
          .innerRadius(radius * donutRatio)
          .outerRadius(radius - radius / 10);

      const svg = d3.select('svg')
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      let path = svg.datum(data).selectAll('path')
          .data(pie)
          .enter().append('path')
          .attr('fill', function(d, i) { return color(i); })
          .attr('d', arc)
          .each(function(d) { this._current = d; }); // store the initial angles
    })

    return chart;
  }

  chart._options = Object.create({}, {
    showLegend: { get: function(){return showLegend;}, set: function(_){showLegend=_;}},
    showLabels: { get: function(){return showLabels;}, set: function(_){showLabels=_;}},
    donutRatio: { get: function(){return donutRatio;}, set: function(_){donutRatio=_;}},
    x:          { get: function(){return getX;}, set: function(_){getX=_;}},
    y:          { get: function(){return getY;}, set: function(_){getY=_;}},
    donut:      { get: function(){return donut;}, set: function(_){donut=_;}},
    margin:     { get: function(){return margin;}, set: function(_){
        margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
        margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
        margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
        margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    }},
    color:      { get: function(){return color;}, set: function(_){color=kdc.utils.getColor(_);}},
    width:      { get: function(){return width;}, set: function(_){width=_;}},
    height:     { get: function(){return height;}, set: function(_){height=_;}},
  })

  kdc.utils.initOptions(chart);
  return chart;
}


/*
Utilities
=================
 */

/*
Bind _options functions to the chart object itself.
 */
kdc.utils.initOption = function(chart, name) {
  chart[name] = function(_) {
    if (!arguments.length) return chart._options[name];
    chart._options[name] = _;
    return chart;
  }
}

kdc.utils.initOptions = function(chart) {
  var ops = Object.getOwnPropertyNames(chart._options || {});
  for (var i in ops) {
    kdc.utils.initOption(chart, ops[i]);
  }
}

kdc.utils.getColor = function(color) {
  //if you pass in nothing, get default colors back
  if (color === undefined) {
    return kdc.utils.defaultColor();

    //if passed an array, turn it into a color scale
  } else if(Array.isArray(color)) {
    var color_scale = d3.scaleOrdinal().range(color);
    return function(d, i) {
      var key = i === undefined ? d : i;
      return d.color || color_scale(key);
    };
  } else {
    return color;
  }
};

kdc.utils.defaultColor = function() {
  return kdc.utils.getColor(d3.scaleOrdinal(d3.schemeCategory10).range());
};

export default kdc;
