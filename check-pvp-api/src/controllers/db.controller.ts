import express = require('express');
import { CharacterModel } from 'models';
import { Character } from 'check-pvp-common/models';

interface Request extends express.Request {
    character: Character;
}

export function getCachedCharacter(
    req: Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { name, realm, region } = req.query;
    CharacterModel.findOne(
        {
            name: { $regex: new RegExp(name, 'i') },
            realm: { $regex: new RegExp(realm, 'i') },
            region: { $regex: new RegExp(region, 'i') },
        },
        (err, character) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            if (!character) {
                console.log('No cached character found');
                res.status(404).send();
                return;
            }
            console.log(`Returning cache hit for character ${character.toObject().name}-${character.toObject().realm}`);

            req.character = character.toObject();
            const { checkerSessionIds, ...rest} = character.toObject();
            res.send({
                ...rest,
                uniqueChecks: checkerSessionIds.length
            });

            console.log(character);

            next();
        }
    );
}
