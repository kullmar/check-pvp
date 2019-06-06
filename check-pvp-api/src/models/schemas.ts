import mongoose from 'mongoose';

const ArenaSchema = {
    currentRating: Number,
    maxRating: Number,
    wins: Number,
    losses: Number
}

export const characterSchema = new mongoose.Schema({
    avatarUri: String,
    class: Number,
    faction: Number,
    name: String,
    realm: String,
    region: {
        type: String,
        enum: ['eu', 'us', 'cn']
    },
    guild: String,
    achievementPoints: Number,
    pvpStats: {
        v2: ArenaSchema,
        v3: ArenaSchema
    }
});

characterSchema.index({
    name: 1,
    realm: 1,
    region: 1,
}, { unique: true });

export const CharacterModel = mongoose.model('Character', characterSchema);