const mongoose = require("mongoose");

const facultyTokenSchema = new mongoose.Schema({
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty',
    },
    accessToken: {
        type: String,
    },
    isValid: {
        type: Boolean,
    },
}, {
    timestamps: true,
})

const facultyToken = mongoose.model('facultyResetPasswordTokens', facultyTokenSchema)
module.exports = facultyToken
