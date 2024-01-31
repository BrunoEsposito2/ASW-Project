import * as express from "express";
import * as mongodb from "mongodb";
import * as dotenv from "dotenv"
import {collections} from "./database";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

dotenv.config()
const { SECRET_ACCESS_TOKEN } = process.env;

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

employeeRouter.get("/", async (_req, res) => {
    try {
        if (jwt.verify(_req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            const employees = await collections.employees.find({}).toArray();
            res.status(200).send(employees);
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

employeeRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const employee = await collections.employees.findOne(query);

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (employee) {
                res.status(200).send(employee);
            } else {
                res.status(404).send(`Failed to find an employee: ID ${id}`);
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (error) {
        res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
    }
});

employeeRouter.post("/auth", async (req, res) => {
   try {
       const name = req.body.name;
       const position = req.body.position;
       const password = req.body.password;
       const query = { name: name, position: position };
       const employee = await collections.employees.findOne(query);

       const token = jwt.sign(
           {name: name},
           SECRET_ACCESS_TOKEN,
           {expiresIn: "1h"} // cookie expire time
       )

       if (employee) {
           bcrypt.compare(password, employee.password, (err, hashRes) => {
               if (hashRes && !err) {
                   const jsonResponse = JSON.stringify({
                       token: token,
                       expiresIn: 60 * 60, // 1 hour is the cookie expire time
                       body: hashRes
                   })
                   res.status(200).json(jsonResponse);
               } else {
                   res.status(401).send(`Invalid credentials inserted.`)
               }
           })
       } else {
           res.status(404).send(`Failed to find the employee`);
       }
   } catch (error) {
       res.status(404).send(`Failed to find an employee: NAME ${req.body.name} POSITION ${req.body.position} `);
   }
});

employeeRouter.post("/", async (req, res) => {
    try {
        const employee = req.body;

        //hashing the employee password
        employee.password = bcrypt.hashSync(employee.password, 10)

        const result = await collections.employees.insertOne(employee);

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (result.acknowledged) {
                res.status(201).send(`Created a new employee: ID ${result.insertedId}.`);
            } else {
                res.status(500).send("Failed to create a new employee.");
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

employeeRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const employee = req.body;
        const query = { _id: new mongodb.ObjectId(id) };

        if (employee.password != '' || employee.password != null || employee.password != undefined) {
            //hashing the new employee password
            employee.password = bcrypt.hashSync(employee.password, 10)
        } else {
            const employeeFound= await collections.employees.findOne(query);
            employee.password = employeeFound.password
        }

        const result = await collections.employees.updateOne(query, { $set: employee });

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (result && result.matchedCount) {
                res.status(200).send(`Updated an employee: ID ${id}.`);
            } else if (!result.matchedCount) {
                res.status(404).send(`Failed to find an employee: ID ${id}`);
            } else {
                res.status(304).send(`Failed to update an employee: ID ${id}`);
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

employeeRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.employees.deleteOne(query);

        if (jwt.verify(req.headers.authorization, SECRET_ACCESS_TOKEN)) {
            if (result && result.deletedCount) {
                res.status(202).send(`Removed an employee: ID ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove an employee: ID ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Failed to find an employee: ID ${id}`);
            }
        } else {
            res.status(401).send("Lacks of valid authentication credentials for the requested resource")
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
