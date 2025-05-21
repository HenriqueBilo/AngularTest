import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { RegisterComponent } from "../register/register.component";
import { LocalStorageUtils } from "../../useful/localstorage";

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {
    
    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router) {}

    canDeactivate(component: RegisterComponent) {
        if(component.unsavedChanges) {
            return window.confirm('Are you sure you want to abandon filling out the form?');
        }
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot) {
        if(this.localStorageUtils.getUserToken()) {
            this.router.navigate(['/home']);
        }

        return true;
    }

}