export type Region = 'eu' | 'us';

export interface ArenaStats {
    currentRating: number;
    maxRating: number;
    wins: number;
    losses: number;
}

export interface Achievement {
    id: number;
    timestamp: number;
}

export interface PvpStats {
    achievements?: Achievement[];
    v2: ArenaStats;
    v3: ArenaStats;
}

export interface Alt {
    maxCr: number;
    maxXp: number;
    name: string;
    realm: string;
    region: string;
}

export interface Character {
    avatarUri: string;
    class: number;
    faction: number;
    name: string;
    realm: string;
    region: Region;
    guild?: string;
    achievementPoints: number;
    pvpStats: PvpStats;
    uniqueChecks?: number;
    alts?: Alt[];
}

export interface SearchHistory {
    class: number;
    maxRating: number;
    name: string;
    faction: number;
    realm: string;
    region: Region;
    timestamp: number;
}