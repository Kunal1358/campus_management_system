const mongoose = require("mongoose");

const studentTokenSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
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

const studentToken = mongoose.model('studentResetPasswordTokens', studentTokenSchema)
module.exports = studentToken
