import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Admin} from "../admin";
import {AdminService} from "../admin.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth-admin',
  template: `
    <app-login-admin-component [initialState]="admin" (formSubmitted)="adminAuth($event)"></app-login-admin-component>
  `
})
export class AuthAdminComponent implements OnInit {
  admin: BehaviorSubject<Admin> = new BehaviorSubject({});

  constructor(
      private router: Router,
      private adminService: AdminService
  ) { }

  ngOnInit() {}

  adminAuth(admin: Admin) {
    const username = admin.email?.substring(0, admin.email?.search('@'));

    this.adminService.getAdmin(admin.email !, admin.password !)
        .subscribe({
          next: () => {
              this.router.navigate(['/admins/dashboard/' + username]);
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
  }
}
