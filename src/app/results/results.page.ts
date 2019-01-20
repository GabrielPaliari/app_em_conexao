import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import chartJs from 'chart.js';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  user: any;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  history: Boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.history = this.route.snapshot.params['history'];
  }

  ngAfterViewInit() {

    this.barChart = this.barCanvas ? new chartJs(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: ['Piorando', 'Mantendo', 'Indeterminado', 'Melhorando'],
            datasets: [{
                data: [8, 19, 3, 10],
                backgroundColor: [
                  '#0bb8ccAA',
                  '#24d6eaAA',
                  '#CCCCCCCC',
                  '#28e070AA',
                ],
                borderColor: [
                  '#0bb8cc',
                  '#24d6ea',
                  '#FFFFFF',
                  '#28e070',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    }) : '';

    this.doughnutChart = this.doughnutCanvas ? new chartJs(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
          labels: ['Piorando', 'Mantendo', 'Indeterminado', 'Melhorando'],
          datasets: [{
              data: [8, 19, 3, 10],
              backgroundColor: [
                '#0bb8ccAA',
                '#24d6eaAA',
                '#CCCCCCCC',
                '#28e070AA',
              ],
              hoverBackgroundColor: [
                '#0bb8cc',
                '#24d6ea',
                '#FFFFFF',
                '#28e070',
              ]
          }]
      }
    }) : '';

    this.lineChart = this.lineCanvas ? new chartJs(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ['10/03', '13/03', '18/03', '20/03'],
          datasets: [
              {
                  label: 'Tempo em Minutos',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [4.9, 4.7, 4.3, 3.6],
                  spanGaps: false,
              }
          ]
      }
    }) : '';
  }
}
