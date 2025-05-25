import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

let client: MongoClient | null = null 

export async function getMongo(){
    if (client) return client;

    const url = process.env.MONGODB_CONNECTION_URL2
    if (!url)
    throw new Error(
      'MONGODB_CONNECTION_URL2 env-var is missing - set it at container RUNTIME'
    );

    client = new MongoClient(url)
    await client.connect()
    return client

}
