import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { MenuLoginComponent } from "../menu-login/menu-login.component";


@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    imports: [
        NgbModule,
        RouterModule,
        MenuLoginComponent
    ],
})
export class MenuComponent {

    public isCollapsed: boolean;

    constructor(){
        this.isCollapsed = true;
    }
}