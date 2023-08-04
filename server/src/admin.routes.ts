import * as express from "express";
import {collections} from "./database";

export const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.get('/:email/:password', async (req, res) => {
    try {
        const email = req?.params?.email;
        const password = req?.params?.password;

        const emailQuery = { email: email };
        const passwordQuery = { password: password };
        const adminEmail = await collections.admins.findOne(emailQuery);
        const adminPassword = await collections.admins.findOne(passwordQuery);

        if (adminEmail) {
            if (adminPassword) {
                res.status(200).send(true);
            } else {
                res.status(404).send(`Failed to find the admin password: ${password}`);
            }
        } else {
            res.status(404).send(`Failed to find the admin email: ${email}`);
        }
    } catch (err) {
        res.status(404).send(`Failed to find the admin credentials inserted.`);
    }
})