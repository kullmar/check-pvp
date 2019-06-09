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
            const charObj = character.toObject();
            console.log(
                `Returning cache hit for character ${charObj.name}-${
                    charObj.realm
                }`
            );

            req.character = charObj;
            const { checkerSessionIds, ...rest } = charObj;
            res.send({
                ...rest,
                uniqueChecks: checkerSessionIds.length,
            });

            next();
        }
    );
}

export function searchCharacter(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    CharacterModel.find({ $text: { $search: req.body } })
        .limit(10)
        .then(docs => res.send(docs));
}
