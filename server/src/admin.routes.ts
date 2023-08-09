import * as express from "express";
import {collections} from "./database";
import bcrypt from "bcrypt";

export const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.get('/:email/:password', async (req, res) => {
    try {
        const email = req?.params?.email;
        const password = req?.params?.password;

        const emailQuery = { email: email };
        const admin = await collections.admins.findOne(emailQuery);

        if (admin) {
            bcrypt.compare(password, admin.password, (err, hashRes) => {
                if (hashRes) {
                    res.status(200).send(hashRes);
                } else {
                    res.status(404).send(`Failed to find the admin password: ${password}`);
                }
            })
        } else {
            res.status(404).send(`Failed to find the admin email: ${email}`);
        }
    } catch (err) {
        res.status(404).send(`Failed to find the admin credentials inserted.`);
    }
})