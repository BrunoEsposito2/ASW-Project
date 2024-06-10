import * as dotenv from "dotenv"
import {MongoClient} from "mongodb";
import * as mongodb from "mongodb";
import {ChatMessage} from "./chat-message";

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

export async function getBroadcastHistory(): Promise<ChatMessage[]> {
    let result;
    try {
        await mongoClient.connect();
        const database = mongoClient.db('aswproject');
        const messages = database.collection('messages');

        const query = { receiver: "all" };
        result = await messages.find(query).toArray()
    } finally {
        // Ensures that the client will close when you error
        await mongoClient.close();
    }

    return convertToChatMessages(result)
}

export async function getRoomHistory(user1: string, user2: string): Promise<ChatMessage[]> {
    let result;
    try {
        await mongoClient.connect();
        const database = mongoClient.db('aswproject');
        const messages = database.collection('messages');

        const query = {
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        };
        result = await messages.find(query).toArray()
    } finally {
        // Ensures that the client will close when you error
        await mongoClient.close();
    }

    return convertToChatMessages(result)
}

function convertToChatMessages(docs: any[]): ChatMessage[] {
    return docs.map(doc => ({
        message: doc.content,
        userName: doc.sender,
        color: getRandomColor()
    }));
}

function getRandomColor(): string {
    let color = '#';

    for (let i = 0; i < 3; i++) {
        // Generate random values in the range of 0-128 for darker shades
        const randomValue = Math.floor(Math.random() * 205);
        // Convert the random value to hexadecimal
        const hexValue = randomValue.toString(16).padStart(2, '0');

        color += hexValue;
    }

    return color;
}