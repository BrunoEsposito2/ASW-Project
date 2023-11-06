import * as mongodb from "mongodb";
import {Employee} from "./employee";
import {Admin} from "./admin";
import {Production} from "./production";
import {EmployeeOperatingData} from "./employee.operating.data";

export const collections: {
    employees?: mongodb.Collection<Employee>;
    admins?: mongodb.Collection<Admin>;
    production?: mongodb.Collection<Production>;
    employee_operating_data?: mongodb.Collection<EmployeeOperatingData>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("aswproject");
    await applySchemaValidation(db);

    const employeesCollection = db.collection<Employee>("employees");
    collections.employees = employeesCollection;

    const adminsCollection = db.collection<Admin>("admins");
    collections.admins = adminsCollection;

    const productionCollection = db.collection<Production>("production");
    collections.production = productionCollection;

    const employeesOperatingDataCollection = db.collection<EmployeeOperatingData>("employee_operating_data");
    collections.employee_operating_data = employeesOperatingDataCollection;

}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {


    const jsonEmployeesSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string, is the description of the type of work",
                    minLength: 5
                },
                img: {
                    bsonType: "string",
                    description: "'img' is a string",
                    minLength: 5
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                    enum: ["junior", "mid", "senior"],
                },
            },
        },
    };


    const jsonEmployeeOperatingDataSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["id_employee"],
            additionalProperties: false,
            properties: {
                _id: {},
                latitude: {
                    bsonType: "string",
                    description: "'latitude' is a string",
                },
                longitude: {
                    bsonType: "string",
                    description: "'longitude' is a string",
                },
                temperature: {
                    bsonType: "number",
                    description: "'temperature' is a number",
                },
                saturation: {
                    bsonType: "number",
                    description: "'saturation' is a number",
                },
                timeIn: {
                    bsonType: "string",
                    description: "'timeIn' is a string",
                },
                id_employee: {
                    bsonType: "string",
                    description: "'id_employee' is required and is a string",
                    minLength: 5
                },
            },
        },
    };

    const jsonAdminsSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is a string",
                    minLength: 5
                },
            },
        },
    };

    const jsonProductionSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["kg_produced", "kg_waste", "timestamp"],
            additionalProperties: false,
            properties: {
                _id: {},
                kg_produced: {
                    bsonType: "number",
                    description: "'kg_produced' is required and is a number",
                    minimum: 0
                },
                kg_waste: {
                    bsonType: "number",
                    description: "'kg_waste' is required and is a number",
                    minimum: 0
                },
                timestamp: {
                    bsonType: "date",
                    description: "'timestamp' is required and is a date"
                },
            }
        }
    };


   await db.command({
        collMod: "employees",
        validator: jsonEmployeesSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("employees", {validator: jsonEmployeesSchema});
        }
    });

    await db.command({
        collMod: "employee_operating_data",
        validator: jsonEmployeeOperatingDataSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("employee_operating_data", {validator: jsonEmployeeOperatingDataSchema});
        }
    });

    await db.command({
       collMod: "admins",
       validator: jsonAdminsSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === "NamespaceNotFound") {
           await db.createCollection("admins", {validator: jsonAdminsSchema});
       }
   })

    await db.command({
        collMod: "production",
        validator: jsonProductionSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("production", {validator: jsonProductionSchema});
        }
    })
}
