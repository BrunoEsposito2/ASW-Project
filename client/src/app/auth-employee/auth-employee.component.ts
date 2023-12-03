import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthSession} from "../../utils/auth-session";
import {Admin} from "../admin";
import {InvalidLoginInputError} from "../../errors/InvalidLoginInputError";

@Component({
  selector: 'app-auth-employee',
  template: `
    <app-login-employee-component [initialState]="employee" (formSubmitted)="employeeAuth($event)"></app-login-employee-component>
  `
})
export class AuthEmployeeComponent implements OnInit {
  private authSession: AuthSession;
  private isAuthenticated = false;
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

  getToken() {
      return this.token;
  }

    private checkCredentials(employee: Employee): string {
        if (!employee.name) {
            throw new InvalidLoginInputError("Invalid name input. Please, retry.")
        }
        if (!employee.position) {
            throw new InvalidLoginInputError("Invalid position input. Please, retry.")
        }
        if (!employee.level) {
            throw new InvalidLoginInputError("Invalid level input. Please, retry.")
        }
        return employee.name;
    }

  employeeAuth(employee: Employee) {
      try {
          const username: string = this.checkCredentials(employee);

          this.employeeService.getEmployeeByInfo(employee.name !, employee.position !, employee.level !)
              .subscribe({
                  next: (response) => {
                      // control of the cookie session storing
                      const token = response.token;
                      this.token = token;
                      if (token && response.body) {
                          const expiresInDuration = response.expiresIn;

                          this.setAuthTimer(expiresInDuration);
                          this.isAuthenticated = true;

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
        this.isAuthenticated = false;
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
