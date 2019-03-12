import { Component, OnInit } from '@angular/core';
import {select, Selection} from 'd3';
import Chart from '../../../charts';

interface ChartData {
  value: number;
  color: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  id = 'chart';

  constructor() { }

  initPieChart(svg: Selection<any, any, any, any>, data: ChartData[], ratio: number, margin: number) {
    const size = 300;

    const chart = Chart.models.pieChart()
      .showLegend(false)
      .showLabels(true)
      .x((d) => {
        return d.value;
      })
      .y((d) => {
        return d.value;
      })
      .donut(true)
      .donutRatio(ratio)
      .color(data.map(x => x.color))
      .margin({top: margin, right: margin, bottom: margin, left: margin})
      .width(size)
      .height(size);

    svg.attr('height', size)
      .attr('width', size)
      .append('g')
      .datum(data)
      .transition()
      .duration(350)
      .call(chart);

    return chart;
  }

  ngOnInit() {
    const svg = select(`#${this.id}`).append('svg');
    this.initPieChart(svg, [{value: 10, color: '#a84dff'}, {value: 25, color: '#ff7517'}], 0.67, 0);
    this.initPieChart(svg, [{value: 25, color: '#2c24ff'}, {value: 10, color: '#fff900'}], 0.55,  37);
  }

}
