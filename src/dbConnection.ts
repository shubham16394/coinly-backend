import mongoose from 'mongoose';
import { env } from 'node:process';
import { config } from './config/config';

export default class MongoHandler {

    async setupDBConnection() {
        const username = encodeURIComponent('codhin16394');
        const password = encodeURIComponent(env.DB_PASSWORD as string);
        const srvURL = `mongodb+srv://${username}:${password}@cluster0.cz5o3lt.mongodb.net/`
        const localURL = `mongodb://0.0.0.0:27017/`;
        const url = env.NODE_ENV === 'prod' ? srvURL + config.db : localURL + config.db;
        const connection = await mongoose.createConnection(url);
        return connection;
    }
}