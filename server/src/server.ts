import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import {connectToDatabase} from "./database";
import {employeeRouter} from "./employee.routes";
import {adminRouter} from "./admin.routes";
import {productionRouter} from "./production.routes";
import {employeeOperatingDataRouter} from "./employee.operating.data.routes";
import cookieParser from "cookie-parser";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI} = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.disable("x-powered-by"); //Reduce fingerprinting
        app.use(cookieParser())
        app.use("/employees", employeeRouter);
        app.use("/admins", adminRouter);
        app.use("/production", productionRouter);
        app.use("/employee-operating-data", employeeOperatingDataRouter);
        // start the Express server
        app.listen(5200, () => {
            console.log(`Database server is running at http://localhost:5200...`);
        });
    })
    .catch(error => console.error(error));

