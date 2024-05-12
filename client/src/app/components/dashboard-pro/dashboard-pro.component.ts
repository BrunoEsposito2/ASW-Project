import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard-pro',
    templateUrl: './dashboard-pro.component.html',
    styleUrls: ['./dashboard-pro.component.scss']
})
export class DashboardProComponent implements OnInit {
    @Input() collapsed = false
    @Input() screenWidth = 0

    constructor() { }

    ngOnInit(): void {
    }

    getBodyClass() {
        let styleClass = ''
        if (this.collapsed && this.screenWidth > 768) {
            styleClass = 'body-trimmed'
        } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
            styleClass = 'body-md-screen'
        }
        return styleClass
    }
}