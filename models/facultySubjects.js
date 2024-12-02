const mongoose = require('mongoose')

const facultySubjectSchema = new mongoose.Schema({

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


const FacultySubjects = mongoose.model('facultySubjects', facultySubjectSchema)
module.exports = FacultySubjects