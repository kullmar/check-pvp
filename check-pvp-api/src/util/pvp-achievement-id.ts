export enum PvpAchievementId {
    // 3v3
    V3_2700 = 5267,
    V3_2400 = 5266,
    V3_2200 = 1160,
    V3_2000 = 405,
    V3_1750 = 403,
    V3_1550 = 402,
    // 2v2
    V2_2200 = 1159,
    V2_2000 = 401,
    V2_1750 = 400,
    V2_1550 = 399,
    // other
    GLADIATOR = 2091,
    BFA_S1_GLAD = 12945,
    BFA_S2_GLAD = 13200
}

export const ALL_PVP_ACHIEVEMENT_IDS: number[] = Object.values(PvpAchievementId).filter(v => typeof v === 'number');
export const TWOS_ACHIEVEMENT_IDS = [PvpAchievementId.V2_2200, PvpAchievementId.V2_2000, PvpAchievementId.V2_1750, PvpAchievementId.V2_1550];