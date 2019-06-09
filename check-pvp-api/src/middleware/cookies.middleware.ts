import session from 'express-session';
import connectSession from 'connect-mongodb-session'
import { config } from 'config';

const MongoDbStore = connectSession(session);

// 2 years
const COOKIE_AGE = 63072000000

const store = new MongoDbStore({
    uri: config.DB_URL,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log(error);
  });

export function configureSession(app: any) {
    app.use(
        session({
            cookie: {
                maxAge: COOKIE_AGE,
            },
            resave: false,
            saveUninitialized: true,
            secret: config.COOKIE_SECRET,
            store
        })
    );
}