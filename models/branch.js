const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({

    branchName: {
        type: String,
    },
    branchCode: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'university'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})




const Branch = mongoose.model('branch', branchSchema)
module.exports = Branch