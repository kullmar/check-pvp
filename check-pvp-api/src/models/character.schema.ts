import mongoose, { Schema, Document } from 'mongoose';
import { Character } from 'check-pvp-common/models';

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

characterSchema.method('getHighestCr', function(): number {
    return Math.max(this.pvpStats.v2.currentRating, this.pvpStats.v3.currentRating);
});

characterSchema.method('getHighestXp', function(): number {
    return Math.max(this.pvpStats.v2.maxRating, this.pvpStats.v3.maxRating);
});

export const CharacterModel = mongoose.model('Character', characterSchema);

export interface CharacterSchema extends Document {
    getHighestCr(): number;
    getHighestXp(): number;
}