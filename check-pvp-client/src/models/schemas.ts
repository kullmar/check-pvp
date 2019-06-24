import { schema } from "normalizr";
import { Character } from "../../../check-pvp-common/models";

export const characterSchema = new schema.Entity('characters', undefined, {
    idAttribute: (character: Character) =>
        `${character.name}-${character.realm}-${character.region}`.toLowerCase()
});