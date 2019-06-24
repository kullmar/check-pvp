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
    ).exec().then(() => updateAlts(character));

    next();
}

export async function updateAlts(character: Character) {
    const { name, realm, region } = character;
    const doc = await CharacterModel.findOne({ name, realm, region });
    const docs = await CharacterModel.find({ _id: { $ne: doc.id } });
    const alts = docs.filter(d => {
        if (doc.get('achievementPoints') !== d.get('achievementPoints')) {
            return false;
        }
        return true;
    });

    if (alts.length > 0) {
        await doc.updateOne({
            $addToSet: { alts: alts.map(alt => alt.id) }
        });
    }
}