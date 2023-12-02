import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthAdminComponent } from "./auth-admin.component"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthAdminComponent) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", authToken)
        });
        return next.handle(authRequest);
    }
}