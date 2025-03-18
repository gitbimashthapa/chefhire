const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    availability: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: String,
        rating: Number,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Chef', chefSchema);