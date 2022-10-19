import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const newDataRouter = express.Router();
newDataRouter.use(express.json());

newDataRouter.get("/", async (_req, res) => {
    const newData = {
      prova: "ciccia"
    }
    const result = await collections.newData.insertOne(newData);
    try {
        const newData = await collections.newData.find({}).toArray();
        res.status(200).send(newData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

newDataRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const newData = await collections.newData.findOne(query);

        if (newData) {
            res.status(200).send(newData);
        } else {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
    }
});

newDataRouter.post("/", async (req, res) => {
    try {
        const newData = req.body;
        const result = await collections.newData.insertOne(newData);

        if (result.acknowledged) {
            res.status(201).send(`Created a new employee: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new employee.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

newDataRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const newData = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.newData.updateOne(query, { $set: newData });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an employee: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an employee: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

newDataRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.newData.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an employee: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an employee: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
