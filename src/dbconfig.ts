import { MongoClient } from 'mongodb';

class MongoConnection {
    private dbName = process.env.DB_NAME || 'dump';
    private dbPort = process.env.DB_PORT || 27017;
    private dbHost: string = process.env.DB_HOST || 'localhost';
    private url: string = `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`;
    private client: MongoClient;

    constructor() {
        this.client = new MongoClient(this.url);
    }

    initMongo() {
        if (!this.client) {
            new MongoConnection();
        }
        this.client.connect().then(val => {
            console.info(`[DB]: Mongo is running at ${this.dbPort}, url: ${this.url}`);
        }).catch(error => {
            console.info(error);
            console.info(`[DB]: Error in connecting to Mongo, url: ${this.url}`);
        }); 
    }

    getDb() {
        const db = this.client.db(this.dbName);
        return db;
    }
}

export const mongoConnection = new MongoConnection();