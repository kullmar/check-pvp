import mongoose from 'mongoose';

export const characterSchema = new mongoose.Schema({
    id: String,
    avatarUri: String,
    class: Number,
    faction: Number,
    name: String,
    realm: String,
    region: String,
    guild: String,
    achievementPoints: Number,
    pvpStats: {
        v2: {
            currentRating: Number,
            maxRating: Number,
            wins: Number,
            losses: Number
        },
        v3: {
            currentRating: Number,
            maxRating: Number,
            wins: Number,
            losses: Number
        }
    }
});

characterSchema.index({
    id: 1,
    region: 1,
}, { unique: true });

export const CharacterModel = mongoose.model('Character', characterSchema);