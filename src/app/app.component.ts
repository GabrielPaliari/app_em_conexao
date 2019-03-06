import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './user.service';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDwwdWWC4Z0-EdMCLdq0L77XcFytTXsYoE',
  authDomain: 'em-conexao.firebaseapp.com',
  databaseURL: 'https://em-conexao.firebaseio.com',
  projectId: 'em-conexao',
  storageBucket: 'em-conexao.appspot.com',
  messagingSenderId: '727433293149'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Logoff',
      url: '/login',
      icon: 'log-out',
      type: 'both'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      type: 'both'
    },
    {
      title: 'Análise Geral',
      url: '/results',
      icon: 'analytics',
      type: 'doctor'
    },
    {
      title: 'Lista de pacientes',
      url: '/patients',
      icon: 'contacts',
      type: 'doctor'
    },    
    {
      title: 'Instruções para o Teste',
      url: '/instructions',
      icon: 'book',
      type: 'patient'
    },
    {
      title: 'Seu Histórico',
      url: '/results',
      icon: 'analytics',
      type: 'patient'
    },
    {
      title: 'Saber Mais',
      url: '/knowmore',
      icon: 'school',
      type: 'patient'
    },
  ];

  user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.user = this.userService.user;
    });
    firebase.initializeApp(config);
  }
}

