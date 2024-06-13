import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {keyframes, style, transition, trigger, animate} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {SocketChatService} from "../../services/socket-chat.service";
import {FakerEmployeeDataService} from "../../faker-employee-data";
import {FakerCycleProduction} from "../../faker-cycle-production";
import {FakerProductionService} from "../../services/faker-production-service/faker.production.service";
import {AuthSession} from "../../../utils/auth-session";
import {faAreaChart, faDoorClosed, faMessage, faUsers} from "@fortawesome/free-solid-svg-icons";

interface SideNavToggle {
    screenWidth: number
    collapsed: boolean
}

@Component({
    selector: 'app-employee-side-nav',
    templateUrl: './employee-side-nav.component.html',
    styleUrls: ['./employee-side-nav.component.scss'],
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
export class EmployeeSideNavComponent implements OnInit {
    private authSession: AuthSession;
    public isFakerServiceActive = false

    @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
    collapsed = false
    screenWidth = 0

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenWidth = window.innerWidth
        if (this.screenWidth <= 768) {
            this.collapsed = false
            this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
        }
    }

    constructor(
        public activatedRoute: ActivatedRoute,
        private router: Router,
        protected socketService: SocketChatService,
        private fakerEmployeeDataService: FakerEmployeeDataService,
        private fakerCycleProduction : FakerCycleProduction,
        private fakerProduction : FakerProductionService,
    ) {
        this.authSession = new AuthSession()
        this.socketService.openConnections(this.activatedRoute.snapshot.paramMap.get('username')!)
        this.toggleFakerService()
    }

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

    redirectToHomePage() {
        this.socketService.disconnect()
        this.authSession.clearAuthData();
        this.router.navigate(['/']);
    }

    redirectToDashboard() {
        this.router.navigate(['employees/dashboard/' + this.activatedRoute.snapshot.paramMap.get('username')]);
    }

    redirectToChat(): void {
        this.router.navigate(["employees/chat/" + this.activatedRoute.snapshot.paramMap.get('username') !]);
    }

    toggleFakerService() {
        if (this.fakerEmployeeDataService.isActive()) {
            this.fakerCycleProduction.stopUpdating();
            this.fakerEmployeeDataService.stopUpdatingDatabase();
            this.fakerProduction.stopUpdating();
            this.isFakerServiceActive = false;
        } else {
            this.fakerCycleProduction.startUpdating();
            this.fakerEmployeeDataService.startUpdatingDatabase();
            this.fakerProduction.startUpdating();
            this.isFakerServiceActive = true;
        }
    }
}