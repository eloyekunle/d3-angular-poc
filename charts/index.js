const kdc = {};
kdc.models = kdc.models || {};
kdc.utils = kdc.utils || {};

// Each chart type will move to their own file..
kdc.models.pieChart = function() {
  let showLegend = false,
      showLabels = true,
      donutRatio = 0.5,
      getX = function(d) { return d.x },
      getY = function(d) { return d.y },
      donut = false;

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
  })

  kdc.utils.initOptions(chart);
  return chart;
}

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

export default kdc;
