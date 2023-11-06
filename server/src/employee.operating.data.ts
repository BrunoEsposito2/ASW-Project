import * as mongodb from "mongodb";

export interface EmployeeOperatingData {
    latitude?: string;
    longitude?: string;
    temperature?: number;
    saturation?: number;
    timeIn?: string;
    _id?: mongodb.ObjectId;
    id_employee: string;
}
