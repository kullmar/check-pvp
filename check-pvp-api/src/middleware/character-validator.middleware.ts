import express from 'express';

export function validateCharacterQuery(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { name, realm, region } = req.query;
    if ( !name || !realm || !region ) {
        console.log('Character query params validation failed');
        res.status(400).send();
        return;
    }
    
    next();
}