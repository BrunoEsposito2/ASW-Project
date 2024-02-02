import * as mongodb from "mongodb";

export interface Message {
    _id?: mongodb.ObjectId;
    sender: string;
    receiver: string;
    content: string;
    timestamp: string;
}