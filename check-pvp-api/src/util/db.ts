import mongoose from 'mongoose';
import { config } from 'config';

export function initDb() {
    console.log('Connecting to DB');
    mongoose.connect(config.DB_URL, { useNewUrlParser: true});
    mongoose.set('debug', true);
    mongoose.set('useCreateIndex', true);
}

const db = mongoose.connection; 

db.on('error', (err) => console.log('Could not connect to db', err));
db.once('open', function() { 
    console.log('Connected to db');
    if (!config.ENV || config.ENV === 'development') {
        mongoose.connection.db.dropDatabase().then(result => {
            console.log('Cleared db');
        })
    }
 });