import { Region } from "../../../check-pvp-common/models";

export function getNameAndRealm(
    raw: string
): { name: string; realm: string } {
    const split = raw.split('-');
    let name = '';
    let realm = '';
    if (split.length === 2) {
        name = split[0];
        realm = split[1];
    }

    return {
        name,
        realm,
    };
}

export const getCharacterId = (name: any, realm: any, region: any): string => `${name}-${realm}-${region}`.toLowerCase();

export const getImageUrlPrefix = (region: Region) =>
    `https://render-${region}.worldofwarcraft.com/character/`;