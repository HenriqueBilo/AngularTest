import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { fromEvent, merge, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../useful/generic-form-validation';
import { rangeLengthValidator, equalToValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  loginForm: FormGroup = new FormGroup({});
  user!: User;
  errors: any[] = [];

  genericValidator!: GenericValidator;
  validationMessages: ValidationMessages = {};
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, private accountService: AccountService,
             private router: Router, private toastr: ToastrService) {
    this.validationMessages = {
      email: {
        required: 'Enter your email',
        email: 'Invalid email'
      },
      password: {
        required: 'Enter your password',
        rangeLength: 'The password must be between 6 and 15 characters'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, rangeLengthValidator(6,15)]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    })
  }

  login() {
    if(this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.accountService.login(this.user)
        .subscribe({
          next: success => this.processSuccess(success),
          error: failure => this.processFailure(failure)
        });
    }
  }

  processSuccess(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveUserLocalData(response);

    let toast = this.toastr.success('Login successful!', 'Welcome!')
    if(toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      })
    }
  }

  processFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error occurred!', 'Ooops :(')
  }
}
