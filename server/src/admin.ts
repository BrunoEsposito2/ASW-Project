import * as mongodb from "mongodb";

export interface Admin {
    email: string;
    password: string;
    _id?: mongodb.ObjectId;
}