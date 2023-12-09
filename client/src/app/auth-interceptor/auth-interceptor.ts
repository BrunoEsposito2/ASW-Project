import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import {AuthSession} from "../../utils/auth-session";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthSession
    constructor() {
        this.authService = new AuthSession()
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getAuthData()?.token
        if (!authToken) {
            return next.handle(req);
        }
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", authToken)
        });
        console.log("url " + req.url)
        console.log("authorization " + authRequest.headers.get("Authorization"))
        return next.handle(authRequest);
    }
}