import express = require("express");
import { CharacterModel } from "models";
import { Character } from "check-pvp-common/models";

interface Request extends express.Request {
    character: Character;
}

export function getCachedCharacter(
    req: Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { name, realm, region } = req.query;
    CharacterModel.findOne({ name, realm, region }, (err, character) => {
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
        console.log(`Returning cache hit for character ${req.params.id}`);

        req.character = character.toObject();
        res.send(character);
        next();
    });
}