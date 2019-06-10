const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    produce: {
        populated: Boolean,
        weight: Number,
        freshness: Number
    },
    cooked: {
        populated: Boolean,
        weight: Number,
        freshness: Number
    },
    baked: {
        populated: Boolean,
        weight: Number,
        freshness: Number
    },
    date: Date,
    time: {
        min: Number,
        max: Number
    },
    location: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    tags: [String],
    imageId: String
    
});

const card = mongoose.model('Card', cardSchema);

module.exports = card;