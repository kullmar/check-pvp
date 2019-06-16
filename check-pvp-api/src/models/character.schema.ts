import mongoose, { Schema } from 'mongoose';

const arenaSchema = {
    currentRating: Number,
    maxRating: Number,
    wins: Number,
    losses: Number
};

export const characterSchema = new mongoose.Schema({
    avatarUri: String,
    class: Number,
    faction: Number,
    name: String,
    realm: String,
    region: {
        type: String,
        enum: ['eu', 'us']
    },
    guild: String,
    achievementPoints: Number,
    pvpStats: {
        achievements: [{
            id: String,
            name: String,
            timestamp: Number
        }],
        v2: arenaSchema,
        v3: arenaSchema
    },
    checkerSessionIds: [String],
    alts: [{
        type: Schema.Types.ObjectId,
        ref: 'Character'
    }]
}, {
    timestamps: true
});

characterSchema.index({
    name: 1,
    realm: 1,
    region: 1,
}, { unique: true });

characterSchema.virtual('characterId').get(function () {
    return `${this.name}-${this.realm}-${this.region}`;
});

export const CharacterModel = mongoose.model('Character', characterSchema);
