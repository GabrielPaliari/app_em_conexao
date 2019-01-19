import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userType = '';

  constructor(
    private $userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.$userService.user.type = this.userType;
    this.router.navigate(['/home']);
  }
}
