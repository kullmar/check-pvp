import express from 'express';
import morgan from 'morgan';
import _ from 'lodash';
import router from 'routes';

const app = express();

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
