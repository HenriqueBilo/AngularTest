import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [
        FooterComponent,
        MenuComponent,
        RouterModule
    ],
    template: `
        <app-menu></app-menu>
        <router-outlet></router-outlet>
        <app-footer></app-footer>
    `,
})
export class NavigationComponent {}