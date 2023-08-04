import * as mongodb from "mongodb";

export interface Employee {
    name: string;
    position: string;
    level: string; //"junior" | "mid" | "senior";
    localization: {
      latitude: string;
      longitude: string;
    }
    _id?: mongodb.ObjectId;
}
