import express from 'express';
import morgan from 'morgan';
import _ from 'lodash';
import routes from 'routes';
import { initDb } from 'util/db';
import { configureSession } from 'middleware/cookies.middleware';

initDb();

const app = express();

app.use(morgan('dev'));

configureSession(app);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(express.json());

app.use('/api', routes);

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
