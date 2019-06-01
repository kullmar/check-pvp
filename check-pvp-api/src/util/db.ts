import mongoose from 'mongoose';
import { config } from 'config';

export function initDb() {
    console.log('Connecting to DB');
    mongoose.set('debug', true);
    mongoose.connect(config.DB_URL, { useNewUrlParser: true});
}

const db = mongoose.connection; 

db.on('error', (err) => console.log('Could not connect to db', err));
db.once('open', function() { console.log('Connected to db') });