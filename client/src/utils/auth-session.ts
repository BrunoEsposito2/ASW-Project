export class AuthSession {
    constructor() {
    }

    getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const username = sessionStorage.getItem("onlineUsername")
        if (!token || !expirationDate || !username) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            username: username
        }
    }

    saveAuthData(token: string, expirationDate: Date, username: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        sessionStorage.setItem("onlineUsername", username);
    }

    clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        sessionStorage.removeItem("onlineUsername")
    }
}