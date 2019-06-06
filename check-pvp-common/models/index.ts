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
    id?: string;
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
    class: number;
    maxRating: number;
    name: string;
    faction: number;
    realm: string;
    region: Region;
    timestamp: number;
}