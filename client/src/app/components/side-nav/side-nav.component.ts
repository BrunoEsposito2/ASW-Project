import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";
import {keyframes, style, transition, trigger, animate} from "@angular/animations";

interface SideNavToggle {
    screenWidth: number
    collapsed: boolean
}

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({opacity: 0}),
                animate('350ms',
                    style({opacity: 1}))
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate('350ms',
                    style({opacity: 0}))
            ]),
        ]),
        trigger('rotate', [
            transition(':enter', [
                animate('1000ms',
                    keyframes([
                        style({transform: 'rotate(0deg)', offset: '0'}),
                        style({transform: 'rotate(2turn)', offset: '1'})
                        ]
                    )
                )
            ])
        ])
    ]
})
export class SideNavComponent implements OnInit {
    @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
    collapsed = false
    screenWidth = 0
    navData = navbarData;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenWidth = window.innerWidth
        if (this.screenWidth <= 768) {
            this.collapsed = false
            this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
        }
    }

    constructor() { }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth
    }

    toggleCollapse() {
        this.collapsed =!this.collapsed
        this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }

    closeSidenav() {
        this.collapsed = false
        this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
}