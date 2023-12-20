import mongoose from 'mongoose';
import { config } from './config/config';

export default class MongoHandler {

    async setupDBConnection() {
        const url = "mongodb://0.0.0.0:27017/" + config.db;
        const connection = await mongoose.createConnection(url);
        return connection;
    }
}