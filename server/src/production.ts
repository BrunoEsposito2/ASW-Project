import * as mongodb from "mongodb";
export interface Production {
    _id?: mongodb.ObjectId;
    kg_produced: Number;
    kg_waste: Number;
    timestamp: Date;
}
