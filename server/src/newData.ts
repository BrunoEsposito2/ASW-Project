import * as mongodb from "mongodb";

export interface NewData {
    prova: string;
    _id?: mongodb.ObjectId;
}
