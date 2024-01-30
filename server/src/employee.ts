import * as mongodb from "mongodb";

export interface Employee {
    name: string;
    position: string;
    level: string; //"junior" | "mid" | "senior";
    img: string;
    _id?: mongodb.ObjectId;
    password: string;
}
