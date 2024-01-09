import {inject, Injectable} from "@angular/core";
import {AuthSession} from "../../utils/auth-session";
import {CanActivateFn, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
class AuthGuard {
    private authSession: AuthSession

    constructor(private router: Router) {
        this.authSession = new AuthSession()
    }

    canActivate(): boolean {
        const authData = this.authSession?.getAuthData()
        if (!authData || !authData.token) {
            alert("Invalid access: you must be logged in. \nPlease, log in to use this application.")
            this.router.navigate(['/'])
            return false;
        }
        const now = new Date();
        const expiresIn = authData.expirationDate.getTime() - now.getTime();
        console.log("EXPIRES IN "+ expiresIn)
        return expiresIn > 0;
    }
}

export const canActivateGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuard).canActivate()
}