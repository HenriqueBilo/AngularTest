import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageUtils } from '../../useful/localstorage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MenuLoginComponent {

  token: string = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {  }

  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.getUserToken();
    this.user = this.localStorageUtils.getUser();

    if (this.user)
      this.email = this.user.email;

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.clearUserLocalData();
    this.router.navigate(['/home']);
  }
}
