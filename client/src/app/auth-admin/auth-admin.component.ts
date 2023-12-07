import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, Subject} from "rxjs";
import {Admin} from "../admin";
import {AdminService} from "../admin.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {InvalidLoginInputError} from "../../errors/InvalidLoginInputError";
import {AuthSession} from "../../utils/auth-session";

@Component({
  selector: 'app-auth-admin',
  template: `
    <app-login-admin-component [initialState]="admin" (formSubmitted)="adminAuth($event)"></app-login-admin-component>
  `
})
export class AuthAdminComponent implements OnInit {
  private authSession: AuthSession
  private isAuthenticated = false;
  private token: string = "";
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  admin: BehaviorSubject<Admin> = new BehaviorSubject({});

  constructor(
      private router: Router,
      private adminService: AdminService
  ) {
      this.authSession = new AuthSession()
  }

  ngOnInit() {
      const authData = this.authSession.getAuthData();
      if (!authData) {
          return;
      }
      const now = new Date();
      const expiresIn = authData.expirationDate.getTime() - now.getTime();
      if (authData.token.search("null") < 0 && expiresIn > 0) {
          this.router.navigate(['/admins/dashboard/' + authData.username]);
      }
  }

  getToken() {
      return this.token;
  }

  private checkCredentials(admin: Admin): string {
      if (!admin.email) {
          throw new InvalidLoginInputError("Invalid email input. Please, retry.")
      }
      if (!admin.password) {
          throw new InvalidLoginInputError("Invalid password input. Please, retry.")
      }
      return admin.email.substring(0, admin.email.search('@'));
  }

  adminAuth(admin: Admin) {
    try {
        const username: string = this.checkCredentials(admin);

        this.adminService.getAdmin(admin.email !, admin.password !)
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
                        this.router.navigate(['/admins/dashboard/' + username]);
                    } else {
                        alert('Failed in receiving token.')
                        console.log("Error: the token is " + token)
                    }
                },
                error: (error: HttpErrorResponse) => {
                    if (error.error.match('email')) {
                        alert('Please, insert a valid email.');
                        console.log(error);
                    } else if (error.error.match('password')) {
                        alert('Please, insert a valid password.');
                        console.log(error);
                    }
                }
            })
    } catch (e: InvalidLoginInputError | any) {
        alert(e.message);
        this.router.navigate(['/admins/login/']);
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
