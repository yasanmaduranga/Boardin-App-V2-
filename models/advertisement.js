const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    price: Number,
    images: Array 
});

module.exports = mongoose.model('Advertisement',advertisementSchema);