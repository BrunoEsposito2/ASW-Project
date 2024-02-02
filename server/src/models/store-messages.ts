import * as dotenv from "dotenv"
import {MongoClient} from "mongodb";

dotenv.config()

const mongoClient = new MongoClient(process.env.ATLAS_URI)

export async function storeMessage(sender: string | string[], receiver: string, content: string, timestamp: string) {

    try {
        await mongoClient.connect();
        const database = mongoClient.db('aswproject');
        const messages = database.collection('messages');

        const message = {
            sender: sender.toString(),
            receiver: receiver,
            content: content,
            timestamp: timestamp
        }
        const result = await messages.insertOne(message);
    } finally {
        // Ensures that the client will close when you error
        await mongoClient.close();
    }
}