import express = require('express');
import { CharacterModel, CharacterSchema } from 'models';
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
    CharacterModel.findOne({
        name: { $regex: new RegExp(name, 'i') },
        realm: { $regex: new RegExp(realm, 'i') },
        region: { $regex: new RegExp(region, 'i') },
    })
        .populate('alts')
        .exec((err, character: CharacterSchema) => {
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
            console.log(charObj)

            res.send({
                avatarUri: charObj.avatarUri,
                name: charObj.name,
                class: charObj.class,
                faction: charObj.faction,
                realm: charObj.realm,
                region: charObj.region,
                guild: charObj.guild,
                achievementPoints: charObj.achievementPoints,
                pvpStats: charObj.pvpStats,
                uniqueChecks: charObj.checkerSessionIds.length,
                alts: character.get('alts').map((alt: CharacterSchema) => ({
                    maxCr: alt.getHighestCr(),
                    maxXp: alt.getHighestXp(),
                    name: alt.get('name'),
                    realm: alt.get('realm'),
                    region: alt.get('region')
                }))
            });

            next();
        });
}

export function searchCharacter(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    CharacterModel.find({ name: { $regex: new RegExp(req.body.query, 'i') } })
        .limit(10)
        .then(docs => {
            res.send(
                docs.map(doc => {
                    const char = doc.toObject();

                    return {
                        name: char.name,
                        realm: char.realm,
                        region: char.region,
                    };
                })
            );
        });
}
