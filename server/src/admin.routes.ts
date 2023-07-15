import * as express from "express";
import * as mongodb from "mongodb";
import {collections} from "./database";

export const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.get("/password/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const admin = await collections.admins.findOne(query);

        // TODO: manage the Admin authentication
        if(admin.password != null){
            let password = admin.password
        }

        if (admin) {
            res.status(200).send(admin.password);
        } else {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
    }

});
