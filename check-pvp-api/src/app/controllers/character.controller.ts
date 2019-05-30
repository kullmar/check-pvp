import { BlizzardApi } from 'services';
import _ from 'lodash';
import { SearchHistory, Character } from 'check-pvp-common/models';
import recentChecks from 'util/recent-checks';

require('dotenv').config();

const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;

class CharacterController {
    private readonly arrayLen = 30;
    private api = new BlizzardApi({ id: BNET_ID, secret: BNET_SECRET });

    getCharacterData = (req: any, res: any) => {
        const nameRealm = this.getNameAndRealm(req.params.id);
        if (!nameRealm) {
            res.status(400).send();
            return;
        }
        const { name, realm } = nameRealm;

        this.api.getCharacterFull(name, realm).then((response: any) => {
            const { data } = response;
            console.log(data);
            const id = `${data.name}-${data.realm}`;
            const characterDto: Character = {
                id,
                avatarUri: data.thumbnail,
                class: data.class,
                faction: data.faction,
                name: data.name,
                realm: data.realm,
                region: 'eu',
                guild: data.guild ? data.guild.name : '',
                achievementPoints: data.achievementPoints,
                pvpStats: {
                    v2: {
                        currentRating: 0,
                        maxRating: 0,
                        wins: 0,
                        losses: 0,
                    },
                    v3: {
                        currentRating: 0,
                        maxRating: 0,
                        wins: 0,
                        losses: 0,
                    },
                },
            };
            res.send(characterDto);

            const recentCheck: SearchHistory = {
                id,
                class: characterDto.class,
                faction: characterDto.faction,
                maxRating: 2789,
                timestamp: Date.now(),
            };
            recentChecks.add(recentCheck);
        });
    };

    private getNameAndRealm = (
        raw: string
    ): { name: string; realm: string } | null => {
        const split = raw.split('-');
        if (split.length !== 2) {
            return null;
        }
        const name = split[0];
        const realm = split[1];

        return {
            name,
            realm,
        };
    };
}

export default new CharacterController();
