const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    role: String,
    profileImage: String,
    technicalSkills: Map,
    plumbingSkills: Map,
    electricalSkills: Map,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema); 