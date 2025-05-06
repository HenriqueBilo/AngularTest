import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    imports: [
        NgbModule,
        RouterModule
    ],
})
export class MenuComponent {

    public isCollapsed: boolean;

    constructor(){
        this.isCollapsed = true;
    }
}