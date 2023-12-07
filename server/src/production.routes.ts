import * as express from "express";
import * as mongodb from "mongodb";
import * as dotenv from "dotenv"
import { collections } from "./database";
import jwt from 'jsonwebtoken';

dotenv.config()
const { SECRET_ACCESS_TOKEN } = process.env;

export const productionRouter = express.Router();
productionRouter.use(express.json());

productionRouter.get("/", async (_req, res) => {
    try {
        if (jwt.verify(_req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            const production = await collections.production.find({}).toArray();
            res.status(200).send(production);
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
productionRouter.get('/productions', async (req, res) => {

    const page: number = parseInt(req.query.page as string);
    const pageSize: number = parseInt(req.query.pageSize as string);
    const skip = (page - 1) * pageSize;
    try {
        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            const productions = await collections.production.find()
                .sort({timestamp: -1}) // Ordinamento decrescente
                .skip(skip)
                .limit(pageSize);
            res.json(productions);
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nel recupero delle produzioni' });
    }
});

productionRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const production = await collections.production.findOne(query);

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (production) {
                res.status(200).send(production);
            } else {
                res.status(404).send(`Failed to find an production: ID ${id}`);
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
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

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (result.acknowledged) {
                res.status(201).send(`Created a new production: ID ${result.insertedId}.`);
            } else {
                res.status(500).send("Failed to create a new production.");
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
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

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (result && result.matchedCount) {
                res.status(200).send(`Updated an production: ID ${id}.`);
            } else if (!result.matchedCount) {
                res.status(404).send(`Failed to find an production: ID ${id}`);
            } else {
                res.status(304).send(`Failed to update an production: ID ${id}`);
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
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

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (result && result.deletedCount) {
                res.status(202).send(`Removed an production: ID ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove an production: ID ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Failed to find an production: ID ${id}`);
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});


/*chat

// Esempio di backend MongoDB con paginazione e ordinamento
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Production = require('./models/Production'); // Assicurati di avere un modello di dati Production

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/productions', async (req, res) => {
  const { page, pageSize } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const productions = await Production.find()
      .sort({ timestamp: -1 }) // Ordinamento decrescente
      .skip(skip)
      .limit(parseInt(pageSize));
    res.json(productions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero delle produzioni' });
  }
});

app.listen(3000, () => {
  console.log('Server avviato sulla porta 3000');
});

 */