export type Region = 'eu' | 'us';

export interface ArenaStats {
    currentRating: number;
    maxRating: number;
    wins: number;
    losses: number;
}

export interface Achievement {
    id: string;
    name: string;
}

export interface PvpStats {
    achievements?: Achievement[];
    v2: ArenaStats;
    v3: ArenaStats;
}

export interface Character {
    id: string;
    avatarUri: string;
    class: number;
    faction: number;
    name: string;
    realm: string;
    region: Region;
    guild?: string;
    achievementPoints: number;
    pvpStats: PvpStats;
}

export interface SearchHistory {
    id: string;
    class: number;
    maxRating: number;
    faction: number;
    region?: Region;
    timestamp: number;
}