import express from 'express';
import morgan from 'morgan';
import EventEmitter from 'events';
import _ from 'lodash';

const app: express.Application = express();
const router = express.Router();

app.use('/api', router);
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});
