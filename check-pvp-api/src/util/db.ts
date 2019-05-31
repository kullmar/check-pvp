import mongoose from 'mongoose';
import { config } from 'config';

export function initDb() {
    console.log('Connecting to DB');
    mongoose.connect(config.DB_URL, { useNewUrlParser: true});
}

const db = mongoose.connection; 

db.on('error', (err) => console.log(err));
db.once('open', function() {
  // we're connected!
});