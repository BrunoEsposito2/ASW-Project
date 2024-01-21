export class InvalidLoginInputError implements Error {
    message: string;
    name: string = "invalid login input error"
    stack: string = ""

    constructor(message: string) {
        this.message = message;
    }
}