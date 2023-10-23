import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const productionRouter = express.Router();
productionRouter.use(express.json());

productionRouter.get("/", async (_req, res) => {
    try {
        const production = await collections.production.find({}).toArray();
        res.status(200).send(production);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

productionRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const production = await collections.production.findOne(query);

        if (production) {
            res.status(200).send(production);
        } else {
            res.status(404).send(`Failed to find an production: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an production: ID ${req?.params?.id}`);
    }
});

productionRouter.post("/", async (req, res) => {
    try {
        const production = req.body;

        if (!production.timestamp) {
            production.timestamp = new Date().toISOString();
        }

        const result = await collections.production.insertOne(production);

        if (result.acknowledged) {
            res.status(201).send(`Created a new production: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new production.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

productionRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const production = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.production.updateOne(query, { $set: production });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an production: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an production: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an production: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
productionRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.production.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an production: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an production: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an production: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
