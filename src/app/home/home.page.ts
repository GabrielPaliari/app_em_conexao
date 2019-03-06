import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
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
}