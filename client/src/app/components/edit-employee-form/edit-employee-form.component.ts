import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Employee} from '../../employee';

interface SideNavToggle {
    screenWidth: number
    collapsed: boolean
}

@Component({
    selector: 'edit-employee-form',
    templateUrl: 'edit-employee-form.component.html',
    styleUrls: ['./edit-employee-form.component.scss']
})
export class EditEmployeeFormComponent implements OnInit {
    @Input() collapsed = false
    @Input() screenWidth = 0

    @Input()
    initialState: BehaviorSubject<Employee> = new BehaviorSubject({});

    @Output()
    formValuesChanged = new EventEmitter<Employee>();

    @Output()
    formSubmitted = new EventEmitter<Employee>();

    employeeForm: FormGroup = new FormGroup({});

    hide = true

    constructor(private fb: FormBuilder) { }

    get name() { return this.employeeForm.get('name')!; }
    get position() { return this.employeeForm.get('position')!; }
    get level() { return this.employeeForm.get('level')!; }
    get img() { return this.employeeForm.get('img')!; }
    get password() { return this.employeeForm.get('password')!; }


    ngOnInit() {
        this.initialState.subscribe(employee => {
            this.employeeForm = this.fb.group({
                name: [ employee.name, [Validators.required, Validators.minLength(3)] ],
                position: [ employee.position, [ Validators.required, Validators.minLength(5) ] ],
                level: [ employee.level, [Validators.required] ],
                img: [ employee.img, [ Validators.required, Validators.minLength(5) ] ],
                password: [ employee.password, [ Validators.required, Validators.minLength(8)]]
            });
        });

        this.employeeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    }

    submitForm() {
        this.formSubmitted.emit(this.employeeForm.value);
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

    onToggleSidenav(data: SideNavToggle) {
        this.screenWidth = data.screenWidth
        this.collapsed = data.collapsed
    }
}
