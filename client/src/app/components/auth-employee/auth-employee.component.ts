import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Employee} from "../../employee";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthSession} from "../../../utils/auth-session";
import {InvalidLoginInputError} from "../../../utils/errors/InvalidLoginInputError";

@Component({
  selector: 'app-auth-employee',
  template: `
    <app-login-employee-component [initialState]="employee" (formSubmitted)="employeeAuth($event)"></app-login-employee-component>
  `
})
export class AuthEmployeeComponent implements OnInit {
  private authSession: AuthSession;
  private token: string = "";
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>()

  employee: BehaviorSubject<Employee> = new BehaviorSubject({});

  constructor(
      private router: Router,
      private employeeService: EmployeeService
  ) {
      this.authSession = new AuthSession();
  }

  ngOnInit() {
      const authData = this.authSession.getAuthData();
      if (!authData) {
          return;
      }
      const now = new Date();
      const expiresIn = authData.expirationDate.getTime() - now.getTime();
      if (authData.token.search("null") < 0 && expiresIn > 0) {
          this.router.navigate(['/employees/dashboard/' + authData.username])
      }
  }

    private checkCredentials(employee: Employee): string {
        if (!employee.name) {
            throw new InvalidLoginInputError("Invalid name input. Please, retry.")
        }
        if (!employee.position) {
            throw new InvalidLoginInputError("Invalid position input. Please, retry.")
        }
        if (!employee.password) {
            throw new InvalidLoginInputError("Invalid password input. Please, retry.")
        }
        return employee.name;
    }

  employeeAuth(employee: Employee) {
      try {
          const username: string = this.checkCredentials(employee);

          this.employeeService.getEmployeeByInfo(employee.name !, employee.position !, employee.password !)
              .subscribe({
                  next: (response) => {
                      const responseData = JSON.parse(response)
                      // control of the cookie session storing
                      const token = responseData.token;
                      this.token = token;
                      if (token && responseData.body) {
                          const expiresInDuration = responseData.expiresIn;

                          this.setAuthTimer(expiresInDuration);

                          const now = new Date();
                          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

                          this.authSession.saveAuthData(token, expirationDate, username);
                          this.router.navigate(['/employees/dashboard/' + employee.name]);
                      }
                  },
                  error: (error: HttpErrorResponse) => {
                      alert('Employee could not be found. Please try again.');
                      console.log(error);
                  }
              })
      } catch (e: InvalidLoginInputError | any) {
          alert(e.message);
          this.router.navigate(['/employees/login/']);
      }
  }

    logout() {
        this.token = "";
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.authSession.clearAuthData();
        this.router.navigate(["/"]);
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
}
