require('dotenv').config()

const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;
const DB_URL = process.env.DB_URL;
const ENV = process.env.NODE_ENV;

export const config = {
    BNET_ID,
    BNET_SECRET,
    DB_URL,
    ENV
};