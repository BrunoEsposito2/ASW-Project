import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthEmployeeComponent } from "./auth-employee.component";

@Injectable()
export class AuthEmployeeInterceptor implements HttpInterceptor {
    constructor(private authService: AuthEmployeeComponent) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", authToken)
        });
        return next.handle(authRequest);
    }
}