import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const productivityRouter = express.Router();
productivityRouter.use(express.json());

productivityRouter.get("/", async (_req, res) => {
    const productivity = {
      kg:250,
      time:new Date(),
    }
    const result = await collections.productivity.insertOne(productivity);
    try {
        const productivity = await collections.productivity.find({}).toArray();
        res.status(200).send(productivity);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

productivityRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const productivity = await collections.productivity.findOne(query);

        if (productivity) {
            res.status(200).send(productivity);
        } else {
            res.status(404).send(`Failed to find an productivity: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an productivity: ID ${req?.params?.id}`);
    }
});

productivityRouter.post("/", async (req, res) => {
    try {
        const productivity = req.body;
        const result = await collections.productivity.insertOne(productivity);

        if (result.acknowledged) {
            res.status(201).send(`Created a new productivity: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new productivity.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

productivityRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const productivity = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.productivity.updateOne(query, { $set: productivity });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an employee: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an productivity: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an productivity: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
productivityRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.productivity.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an productivity: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an productivity: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an productivity: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
