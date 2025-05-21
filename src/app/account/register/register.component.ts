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
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, AfterViewInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  registerForm: FormGroup = new FormGroup({});
  user!: User;
  errors: any[] = [];

  genericValidator!: GenericValidator;
  validationMessages: ValidationMessages = {};
  displayMessage: DisplayMessage = {};

  unsavedChanges: boolean;

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
      },
      confirmPassword: {
        required: 'Re-enter your password',
        rangeLength: 'The password must be between 6 and 15 characters',
        equalTo: 'Passwords do not match'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    let formPassword = new FormControl('', [Validators.required, rangeLengthValidator(6,15)]);
    let formConfirmPassword = new FormControl('', [Validators.required, rangeLengthValidator(6,15), equalToValidator(formPassword)]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: formPassword,
      confirmPassword: formConfirmPassword
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.registerForm);
      this.unsavedChanges = true;
    })
  }

  addAccount() {
    if(this.registerForm.dirty && this.registerForm.valid) {
      this.user = Object.assign({}, this.user, this.registerForm.value);

      this.accountService.registerUser(this.user)
        .subscribe({
          next: success => this.processSuccess(success),
          error: failure => this.processFailure(failure)
        });

        this.unsavedChanges = false;
    }
  }

  processSuccess(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveUserLocalData(response);

    let toast = this.toastr.success('Successfully registered!', 'Welcome!')
    if(toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      })
    }
  }

  processFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error has appeared!', 'Ooops :(')
  }
}
