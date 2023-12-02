import * as express from "express";
import * as dotenv from "dotenv";
import {collections} from "./database";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

dotenv.config();
const { SECRET_ACCESS_TOKEN } = process.env;

export const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.get('/:email/:password', async (req, res) => {
    try {
        const email = req?.params?.email;
        const password = req?.params?.password;

        const emailQuery = { email: email };
        const admin = await collections.admins.findOne(emailQuery);

        const token = jwt.sign(
            {email: email},
            SECRET_ACCESS_TOKEN,
            {expiresIn: "1h"}
        )
        console.log("token: " + token);

        if (admin) {
            /*if (!verifiedToken) {
                req.headers.authorization = jwt.sign(admin, admin._id.toString("base64"), {expiresIn: '1h'});
            }*/
            console.log("passed")
            bcrypt.compare(password, admin.password, (err, hashRes) => {
                if (hashRes && !err) {
                    res.status(200).send({
                        token: token,
                        expiresIn: 3600,
                        body: hashRes
                    });
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