import * as mongodb from "mongodb";

export interface Employee {
    name: string;
    position: string;
    level: "junior" | "mid" | "senior";
    localization: {
      latitude: string;
      longitude: string;
    }
    _id?: mongodb.ObjectId;
}
