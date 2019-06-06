import express from 'express';
import recentChecks from 'util/recent-checks';
import { Character, SearchHistory, PvpStats } from 'check-pvp-common/models';

interface Request extends express.Request {
    character: Character
}

export function addToRecentChecks(req: Request, res: express.Response) {
    const { character } = req;
    const recentCheck: SearchHistory = {
        id: character.id,
        class: character.class,
        faction: character.faction,
        maxRating: getMaxRating(character.pvpStats),
        timestamp: Date.now(),
    };
    
    recentChecks.add(recentCheck);
}

function getMaxRating(pvpStats: PvpStats) {
    return Math.max(pvpStats.v2.maxRating, pvpStats.v3.maxRating);
}