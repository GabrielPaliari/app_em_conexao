import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import chartJs from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  user: any;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor (
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  ngAfterViewInit() {

    this.barChart = new chartJs(this.barCanvas.nativeElement, {
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

    });

    this.doughnutChart = new chartJs(this.doughnutCanvas.nativeElement, {

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
    });

    this.lineChart = new chartJs(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'My First dataset',
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
                  data: [65, 59, 80, 81, 56, 55, 40],
                  spanGaps: false,
              }
          ]
      }
    });
  }
}
