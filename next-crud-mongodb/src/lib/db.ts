import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB_CONNECTION_URL2!
console.log(url)

// leave empty for now, its for MongoDB Configs
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
    client = new MongoClient(url, options)
    global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export default clientPromise