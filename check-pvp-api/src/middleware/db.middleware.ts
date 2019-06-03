import express, { response } from 'express';
import { CharacterModel } from 'models';

export function getCachedCharacter(req: express.Request, res: express.Response, next: express.NextFunction) {
    const document = CharacterModel.findOne({ id: req.params.id.toLowerCase() }, (err, character) => {
        console.log(`Returning cache hit for character ${req.params.id}`);
        res.writeHead(200, {
            'Transfer-Encoding': 'chunked'
        });
        res.write(JSON.stringify(character));
    });
    
    next();
}