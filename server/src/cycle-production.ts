import * as mongodb from "mongodb";
export interface CycleProduction {
    date?: string;
    _id?: mongodb.ObjectId;
    currentState: string;
    currentValue: string;
    cycle: string;
}
