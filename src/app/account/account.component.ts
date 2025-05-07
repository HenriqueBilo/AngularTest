import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  providers: [
    AccountService
  ],
  template: '<router-outlet></router-outlet>',
})
export class AccountComponent {

}
