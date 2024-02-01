import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../models/database";


export const cycleProductionRouter = express.Router();
cycleProductionRouter.use(express.json());

cycleProductionRouter.get("/", async (_req, res) => {
    try {
        const cycleProduction = await collections.cycle_production.find({}).toArray();
        res.status(200).send(cycleProduction);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

cycleProductionRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const data = await collections.cycle_production.findOne(query);

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send(`Failed to find employee operating data: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find employee operating data: ID ${req?.params?.id}`);
    }
});

cycleProductionRouter.post("/", async (req, res) => {
        try {
        const data = req.body;
        const result = await collections.cycle_production.insertOne(data);

        if (result.acknowledged) {
            console.log('Collezione creata con successo:', result.insertedId);
            res.status(201).send(`Created new employee operating data: ID ${result.insertedId}.`);
        } else {
            console.log('Errore nella creazione della collezione.');
            res.status(500).send("Failed to create new employee operating data.");
        }
    } catch (error) {
        console.error('Errore durante la gestione della richiesta:', error);
        res.status(400).send(error.message);
    }
});
cycleProductionRouter.get("/:date/:currentState/:currentValue/:cycle", async (req, res) => {
    try {
        const date: string = req?.params?.date;
        const currentState: string = req?.params?.currentState;
        const currentValue: string = req?.params?.currentValue;
        const cycle: string = req?.params?.cycle;

        const query = { date: date, currentState: currentState, currentValue: currentValue, cycle: cycle};
        const cycle_production = await collections.cycle_production.findOne(query);

        if (cycle_production) {
            res.status(200).send(cycle_production);
        } else {
            res.status(404).send(`Failed to find the employee`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an employee: DATE ${req?.params?.date} CURRENTSTATE ${req?.params?.currentState} CURRENTVALUE ${req?.params?.currentValue} CYCLE ${req?.params?.cycle}`);
    }
});

cycleProductionRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.cycle_production.deleteOne(query);

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
