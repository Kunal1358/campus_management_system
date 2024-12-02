const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({

    subjectName: {
        type: String,
    },
    subjectCode: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'university'
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})




const Subject = mongoose.model('subject', subjectSchema)
module.exports = Subject