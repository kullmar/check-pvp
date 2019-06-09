import express from 'express';
import { CharacterModel } from 'models';
import { Character } from 'check-pvp-common/models';

interface Request extends express.Request {
    character: Character;
}

export function saveCharacter(
    req: Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { character } = req;
    CharacterModel.updateOne(
        {
            name: character.name,
            realm: character.realm,
            region: character.region,
        },
        {
            ...character,
            $addToSet: { checkerSessionIds: req.sessionID }
        },
        { upsert: true, runValidators: true }
    ).exec();

    next();
}
