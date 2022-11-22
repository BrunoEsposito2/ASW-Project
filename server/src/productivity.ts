import * as mongodb from "mongodb";

export interface Productivity {
    kg: Number;
    time: Date;
    _id?: mongodb.ObjectId;
}
