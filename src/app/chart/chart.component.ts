import { Component, OnInit } from '@angular/core';
import {select, Selection} from 'd3';
import Chart from '../../../charts';

interface ChartData {
  value: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  id = 'chart';
  size = 300;

  constructor() { }

  initPieChart(svg: Selection<any, any, any, any>, data: ChartData[]) {
    const chart = Chart.models.pieChart();
    const size = this.size || 280;

    svg.attr('height', size)
      .attr('width', size)
      .append('g')
      .datum(data)
      .transition()
      .duration(350)
      .call(chart);
  }

  ngOnInit() {
    const svg = select(`#${this.id}`).append('svg');
    const chart = this.initPieChart(svg, [{value: 10}, {value: 25}]);
  }

}
