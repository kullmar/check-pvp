import express from 'express';
import { BlizzardApi } from 'services';
import _ from 'lodash';
import { Character, PvpStats, Achievement } from 'check-pvp-common/models';
import { config } from 'config';
import { ALL_PVP_ACHIEVEMENT_IDS } from 'util/pvp-achievement-id';

const { BNET_ID, BNET_SECRET } = config;

interface Request extends express.Request {
    character?: Character;
}

class CharacterController {
    private api = new BlizzardApi({ id: BNET_ID, secret: BNET_SECRET });

    getCharacter = (
        req: Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const { name, realm, region } = req.query;
        this.api
            .getCharacterFull(name, realm)
            .then(response => {
                const { data } = response;
                const character: Character = {
                    avatarUri: data.thumbnail,
                    class: data.class,
                    faction: data.faction,
                    name: data.name,
                    realm: data.realm,
                    region: 'eu',
                    guild: data.guild ? data.guild.name : '',
                    achievementPoints: data.achievementPoints,
                    pvpStats: {
                        achievements: this.getPvpAchievements(data.achievements),
                        ...this.getPvpStats(data),
                    }
                };

                console.log(
                    `Returning live data for character ${character.name}`
                );
                res.send(character);
                req.character = character;

                next();
            })
            .catch(err => res.status(404).send(err));
    };

    getCharacterRaw = (req: express.Request, res: express.Response) => {
        const { name, realm, region } = req.query;

        this.api
            .getCharacterFull(name, realm)
            .then(response => res.send(response.data));
    };

    private getPvpStats(data: any): PvpStats {
        const bracket2v2 = {
            cr: data.pvp.brackets.ARENA_BRACKET_2v2.rating,
            losses: data.pvp.brackets.ARENA_BRACKET_2v2.seasonLost,
            wins: data.pvp.brackets.ARENA_BRACKET_2v2.seasonWon,
        };
        const bracket3v3 = {
            cr: data.pvp.brackets.ARENA_BRACKET_3v3.rating,
            losses: data.pvp.brackets.ARENA_BRACKET_3v3.seasonLost,
            wins: data.pvp.brackets.ARENA_BRACKET_3v3.seasonWon,
        };
        const pvpStatistics = data.statistics.subCategories.find(
            (category: any) => category.name === 'Player vs. Player'
        );
        const ratedArenas = pvpStatistics.subCategories.find(
            (category: any) => category.name === 'Rated Arenas'
        );
        const max2v2 = ratedArenas.statistics.find(
            (statistic: any) =>
                statistic.name === 'Highest 2 man personal rating'
        ).quantity;
        const max3v3 = ratedArenas.statistics.find(
            (statistic: any) =>
                statistic.name === 'Highest 3 man personal rating'
        ).quantity;


        return {
            v2: {
                currentRating: bracket2v2.cr,
                maxRating: max2v2,
                losses: bracket2v2.losses,
                wins: bracket2v2.wins,
            },
            v3: {
                currentRating: bracket3v3.cr,
                maxRating: max3v3,
                losses: bracket3v3.losses,
                wins: bracket3v3.wins,
            },
        };
    }

    private getPvpAchievements(data: { achievementsCompleted: number[], achievementsCompletedTimestamp: number[] }): Achievement[] {
        const pvpAchiIndices: number[] = [];
        data.achievementsCompleted.forEach((id, index) => {
            if (ALL_PVP_ACHIEVEMENT_IDS.includes(id)) {
                pvpAchiIndices.push(index);
            }
        });
        
        return pvpAchiIndices.map(index => ({
            id: data.achievementsCompleted[index],
            name: '',
            timestamp: data.achievementsCompletedTimestamp[index]
        }));
    }
}

export default new CharacterController();
