import { Character } from '../models';

export function getCharacterId(character: Character) {
  return `${character.name}-${character.realm}-${character.region}`;
}
