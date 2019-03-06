import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import chartJs from 'chart.js';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'Firebase';
import { ToastController } from '@ionic/angular';

export const snapshotToArray = snapshot => {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
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

  data = [];
  ref = firebase.database().ref('dados_teste');
  refStartTest = firebase.database().ref('start_test');

  fetched = false;
  datas = [
    '30/8/2018',
    '23/8/2018',
    '16/8/2018',
    '09/8/2018',
    '02/8/2018',
    '25/7/2018',
    '18/7/2018',
    '11/7/2018',
    '04/7/2018',
    '28/6/2018',
    '21/6/2018',
    '12/6/2018',
    '05/6/2018',
    '22/5/2018',
    '15/5/2018',
    '08/5/2018',
    '01/5/2018',
    '29/4/2018',
    '24/4/2018',
    '17/4/2018',
    '10/4/2018',
    '03/4/2018',
    '27/3/2018',
    '20/3/2018',
    '13/3/2018',
    '06/3/2018',
    '27/2/2018',
    '20/2/2018',
    '13/2/2018',
    '06/2/2018',
    '30/1/2018',
    '23/1/2018',
    '16/1/2018'
   ];
  tempos = [
    '23.5',
    '22.5',
    '22',
    '22',
    '21',
    '20.5',
    '20',
    '19.5',
    '19',
    '17.5',
    '19',
    '18.5',
    '18',
    '18',
    '18.5',
    '18.5',
    '18.5',
    '18',
    '18.5',
    '17.5',
    '18',
    '18',
    '18.5',
    '18',
    '18',
    '18',
    '17.5',
    '18',
    '18.5',
    '19.5',
    '20.5',
    '21.5',
    '22'
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.history = this.route.snapshot.params['history'];
    this.ref.on('value', resp => {
      const dataArray = snapshotToArray(resp);
      console.log(dataArray);
      const lastTest = dataArray[dataArray.length - 1];
      this.datas.unshift(lastTest.data.date);
      this.tempos.unshift(lastTest.data.time);
      this.presentToast('Dados do teste obtidos com sucesso');
    });
  }

  startTest() {
    const date = Date.now();
    this.refStartTest.set({
      startDate: date.toString() 
    });
    this.presentToast('Teste Iniciado no tabuleiro');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  ngAfterViewInit() {

    this.barChart = this.barCanvas ? new chartJs(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: ['Piorando', 'Mantendo', 'Indeterminado', 'Melhorando'],
            datasets: [{
                label: 'Número de pacientes',
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
          labels: [
                   '1/16/2018',
                   '1/23/2018',
                   '1/30/2018',
                   '2/6/2018',
                   '2/13/2018',
                   '2/20/2018',
                   '2/27/2018',
                   '3/6/2018',
                   '3/13/2018',
                   '3/20/2018',
                   '3/27/2018',
                   '4/3/2018',
                   '4/10/2018',
                   '4/17/2018',
                   '4/24/2018',
                   '5/1/2018',
                   '5/8/2018',
                   '5/15/2018',
                   '5/22/2018',
                   '4/29/2018',
                   '6/5/2018',
                   '6/12/2018',
                   '6/21/2018',
                   '6/28/2018',
                   '7/4/2018',
                   '7/11/2018',
                   '7/18/2018',
                   '7/25/2018',
                   '8/2/2018',
                   '8/9/2018',
                   '8/16/2018',
                   '8/23/2018',
                   '8/30/2018'
                  ],
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
                  data: [
                          '22',
                          '21.5',
                          '20.5',
                          '19.5',
                          '18.5',
                          '18',
                          '17.5',
                          '18',
                          '18',
                          '18',
                          '18.5',
                          '18',
                          '18',
                          '17.5',
                          '18.5',
                          '18.5',
                          '18.5',
                          '18.5',
                          '18',
                          '18',
                          '18',
                          '18.5',
                          '19',
                          '17.5',
                          '19',
                          '19.5',
                          '20',
                          '20.5',
                          '21',
                          '22',
                          '22',
                          '22.5',
                          '23.5'
                        ],
                  spanGaps: false,
              }
          ]
      }
    }) : '';
  }
}
