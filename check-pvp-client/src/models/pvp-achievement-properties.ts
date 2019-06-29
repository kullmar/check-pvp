export interface PvpAchievementProperty {
    [id: number]: {
        description: string;
        icon: string;
        label: string;
        rating?: number;
    }
}

const description = (rating: number, bracket: '2v2' | '3v3' ) => `Earn a ${rating} personal rating in the ${bracket} bracket of the arena.`;

export const PVP_ACHIEVEMENT_PROPERTIES: PvpAchievementProperty = {
        5267: {
            description: description(2700, '3v3'),
            icon: require('../assets/icons/achievement_arena_3v3_7.jpg'),
            label: 'Three\'s company: 2700',
            rating: 2700

        },
        5266: {
            description: description(2400, '3v3'),
            icon: require('../assets/icons/achievement_arena_3v3_7.jpg'),
            label: 'Three\'s company: 2400',
            rating: 2400
        },
        1160: {
            description: description(2200, '3v3'),
            icon: require('../assets/icons/achievement_arena_3v3_7.jpg'),
            label: 'Three\'s company: 2200',
            rating: 2200
        },
        405: {
            description: description(2000, '3v3'),
            icon: require('../assets/icons/achievement_arena_3v3_5.jpg'),
            label: 'Three\'s company: 2000',
            rating: 2000
        },
        403: {
            description: description(1750, '3v3'),
            icon: require('../assets/icons/achievement_arena_3v3_4.jpg'),
            label: 'Three\'s company: 1750',
            rating: 1750
        },
        402: {
            description: description(1550, '3v3'),
            icon: require('../assets/icons/achievement_arena_3v3_1.jpg'),
            label: 'Three\'s company: 1550',
            rating: 1550
        },
        // 2v2
        1159: {
            description: description(2200, '2v2'),
            icon: require('../assets/icons/achievement_arena_2v2_7.jpg'),
            label: 'Just the two of us: 2200',
            rating: 2200
        },
        401: {
            description: description(2000, '2v2'),
            icon: require('../assets/icons/achievement_arena_2v2_5.jpg'),
            label: 'Just the two of us: 2000',
            rating: 2000
        },
        400: {
            description: description(1750, '2v2'),
            icon: require('../assets/icons/achievement_arena_2v2_4.jpg'),
            label: 'Just the two of us: 1750',
            rating: 1750
        },
        399: {
            description: description(1550, '2v2'),
            icon: require('../assets/icons/achievement_arena_2v2_1.jpg'),
            label: 'Just the two of us: 1550',
            rating: 1550
        },
        // Gladiator
        2091: {
            description: 'Earn the gladiator title in an arena season.',
            icon: require('../assets/icons/achievement_gladiator.jpg'),
            label: 'Gladiator'
        },
        12945: {
            description: '',
            icon: require('../assets/icons/achievement_gladiator.jpg'),
            label: 'Gladiator: Battle for Azeroth Season 1'
        },
        13200: {
            description: '',
            icon: require('../assets/icons/achievement_gladiator.jpg'),
            label: 'Gladiator: Battle for Azeroth Season 2'
        }
}

export const ALL_2s_ACHIEVEMENT_IDS = [1159, 401, 400, 399];
export const ALL_3s_ACHIEVEMENT_IDS = [5267, 5266, 1160, 405, 403, 402];
export const GLADIATOR_ID = 2091;