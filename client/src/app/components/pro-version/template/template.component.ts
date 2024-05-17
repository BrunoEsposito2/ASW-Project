import { Component } from '@angular/core';

interface SideNavToggle {
    screenWidth: number
    collapsed: boolean
}

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
    title = 'dashboard';

    isSideNavCollapsed = false
    screenWidth = 0

    onToggleSidenav(data: SideNavToggle) {
        this.screenWidth = data.screenWidth
        this.isSideNavCollapsed = data.collapsed
    }
}