const kdc = {};
kdc.models = kdc.models || {};

// Each chart type will move to their own file..
kdc.models.pieChart = function() {
  let showLegend = false,
      showLabels = true;

  function chart(selection) {
    console.log(selection);
  }

  chart._options = Object.create({}, {
    showLegend: { get: function(){return showLegend;}, set: function(_){showLegend=_;}},
    showLabels: { get: function(){return showLabels;}, set: function(_){showLabels=_;}}
  })

  initOptions(chart);
  return chart;
}

function initOption(chart, name) {
  chart[name] = function(_) {
    if (!arguments.length) return chart._options[name];
    chart._options[name] = _;
    return chart;
  }
}

function initOptions(chart) {
  var ops = Object.getOwnPropertyNames(chart._options || {});
  for (var i in ops) {
    initOption(chart, ops[i]);
  }
}

export default kdc;
