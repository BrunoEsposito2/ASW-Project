import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";


export const employeeOperatingDataRouter = express.Router();
employeeOperatingDataRouter.use(express.json());

employeeOperatingDataRouter.get("/", async (_req, res) => {
    try {
        const employeeOperatingData = await collections.employee_operating_data.find({}).toArray();
        res.status(200).send(employeeOperatingData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

employeeOperatingDataRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const data = await collections.employee_operating_data.findOne(query);

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send(`Failed to find employee operating data: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find employee operating data: ID ${req?.params?.id}`);
    }
});

employeeOperatingDataRouter.post("/employee-operating-data", async (req, res) => {
    try {
        const data = req.body;
        const result = await collections.employee_operating_data.insertOne(data);

        if (result.acknowledged) {
            res.status(201).send(`Created new employee operating data: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create new employee operating data.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

employeeOperatingDataRouter.get("/:latitude/:longitude/:temperature/:saturation/:timeIn/:id_employee", async (req, res) => {
    try {
        const latitude: string = req?.params?.latitude;
        const longitude: string = req?.params?.longitude;
        const temperature: number = parseFloat(req?.params?.temperature);
        const saturation: number = parseFloat(req?.params?.saturation);
        const timeIn: string = req?.params?.timeIn;
        const id_employee: string = req?.params?.id_employee;

        const query = { latitude: latitude, longitude: longitude, temperature: temperature, saturation: saturation,  timeIn: timeIn, id_employee: id_employee};
        const employee_operating_data = await collections.employee_operating_data.findOne(query);

        if (employee_operating_data) {
            res.status(200).send(employee_operating_data);
        } else {
            res.status(404).send(`Failed to find the employee`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an employee: LATITUDE ${req?.params?.latitude} LONGITUDE ${req?.params?.longitude} TEMPERATURE ${req?.params?.temperature} SATURATION ${req?.params?.saturation} TIMEIN ${req?.params?.timeIn} IDEMPLOYEE ${req?.params?.id_employee}`);
    }
});

employeeOperatingDataRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.employee_operating_data.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed employee operating data: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove employee operating data: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find employee operating data: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
