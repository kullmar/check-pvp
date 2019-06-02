import express from 'express';
import { CharacterModel } from 'models';

export function getCachedCharacter(req: express.Request, res: express.Response) {
    const document = CharacterModel.findOne({ id: req.params.id.toLowerCase() }, (err, character) => {
        console.log(`Returning cache hit for character ${req.params.id}`);
        res.write(JSON.stringify(character));
    });
}