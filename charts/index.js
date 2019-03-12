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
      color = kdc.utils.defaultColor();

  function chart(selection) {
    console.log(selection);
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
    color: {get: function(){return color;}, set: function(_){color=kdc.utils.getColor(_);}},
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

    //if passed a function or scale, return it, or whatever it may be
    //external libs, such as angularjs-nvd3-directives use this
  } else {
    //can't really help it if someone passes rubbish as color
    return color;
  }
};

kdc.utils.defaultColor = function() {
  return kdc.utils.getColor(d3.scaleOrdinal(d3.schemeCategory10).range());
};

export default kdc;
