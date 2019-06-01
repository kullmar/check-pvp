import { BlizzardApi } from '../services';
import _ from 'lodash';
import { SearchHistory, Character, PvpStats } from 'check-pvp-common/models';
import recentChecks from '../util/recent-checks';
import { config } from '../config';
import { CharacterModel } from 'models';

const { BNET_ID, BNET_SECRET } = config;

class CharacterController {
    private api = new BlizzardApi({ id: BNET_ID, secret: BNET_SECRET });

    getCharacterData = (req: any, res: any) => {
        const document = CharacterModel.findOne({ id: req.params.id.toLowerCase() }, (err, character) => {
            console.log(character);
            res.write(JSON.stringify(character));
        });

        const nameRealm = this.getNameAndRealm(req.params.id);
        if (!nameRealm) {
            res.status(400).send();
            return;
        }
        const { name, realm } = nameRealm;

        this.api.getCharacterFull(name, realm).then((response: any) => {
            const { data } = response;
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
                pvpStats: this.getPvpStats(data)
            };
            res.write(characterDto);
            res.end();

            const recentCheck: SearchHistory = {
                id,
                class: characterDto.class,
                faction: characterDto.faction,
                maxRating: 2789,
                timestamp: Date.now(),
            };
            recentChecks.add(recentCheck);

            const dbCharacter = new CharacterModel({...characterDto, id: characterDto.id.toLowerCase()});
            dbCharacter.save();
        });
    }

    getCharacterRaw = (req: any, res: any) => {
        const nameRealm = this.getNameAndRealm(req.params.id);
        if (!nameRealm) {
            res.status(400).send();
            return;
        }
        const { name, realm } = nameRealm;

        this.api.getCharacterFull(name, realm).then(response => res.send(response.data));
    }

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

    private getPvpStats(data: any): PvpStats {
        const bracket2v2 = {
            cr: data.pvp.brackets.ARENA_BRACKET_2v2.rating,
            losses: data.pvp.brackets.ARENA_BRACKET_2v2.seasonLost,
            wins: data.pvp.brackets.ARENA_BRACKET_2v2.seasonWon
        }
        const bracket3v3 = {
            cr: data.pvp.brackets.ARENA_BRACKET_3v3.rating,
            losses: data.pvp.brackets.ARENA_BRACKET_3v3.seasonLost,
            wins: data.pvp.brackets.ARENA_BRACKET_3v3.seasonWon
        }
        const pvpStatistics = data.statistics.subCategories.find((category: any) => category.name === 'Player vs. Player');
        const ratedArenas = pvpStatistics.subCategories.find((category: any) => category.name === 'Rated Arenas');
        const max2v2 = ratedArenas.statistics.find((statistic: any) => statistic.name === 'Highest 2 man personal rating').quantity;
        const max3v3 = ratedArenas.statistics.find((statistic: any) => statistic.name === 'Highest 3 man personal rating').quantity;

        return {
            v2: {
                currentRating: bracket2v2.cr,
                maxRating: max2v2,
                losses: bracket2v2.losses,
                wins: bracket2v2.wins
            },
            v3: {
                currentRating: bracket3v3.cr,
                maxRating: max3v3,
                losses: bracket3v3.losses,
                wins: bracket3v3.wins
            }
        };
    }
}

export default new CharacterController();
