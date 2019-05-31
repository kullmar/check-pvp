import mongoose from 'mongoose';

export const arenaSchema = new mongoose.Schema({
    currentRating: Number,
    maxRating: Number,
    wins: Number,
    losses: Number
});

export const pvpSchema = new mongoose.Schema({
    v2: arenaSchema,
    v3: arenaSchema
});

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
    pvpStats: pvpSchema
});

export const CharacterModel = mongoose.model('Character', characterSchema);