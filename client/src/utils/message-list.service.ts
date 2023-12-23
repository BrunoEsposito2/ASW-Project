import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class MessageListService {
    userName = "";
    message = "";

    private messageList: {message: string, userName: string, mine: boolean, color: string}[] = [];

    constructor() {
    }

    addMessage(message: {message: string, userName: string, mine: boolean, color: string}) {
        this.messageList.push(message);
    }

    getMessages(): {message: string, userName: string, mine: boolean, color: string}[] {
        return this.messageList;
    }
}