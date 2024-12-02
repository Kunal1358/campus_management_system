const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const facultySchema = new mongoose.Schema({

    facultyName: {
        type: String
    },
    facultyId: {
        type: String
    },
    age: {
        type: Number,
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
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})



facultySchema.virtual('facultySubjects', {
    ref: 'facultySubjects',
    localField: '_id',
    foreignField: 'faculty',
    match: { isDeleted: false }
})



// logging in user
facultySchema.statics.findByCredentials = async (body) => {

    const { facultyId, email, password } = body

    const faculty = await Faculty.findOne({ email, facultyId, isDeleted: false })
    if (!faculty) {
        throw new Error("Unable to logIn")
    }

    const isMatch = await bcryptjs.compare(password, faculty.password)
    if (!isMatch) {
        throw new Error("Invalid Credentials")
    }
    return faculty
}


// faculty update password
facultySchema.statics.findByPassword = async (id, currentPassword) => {

    const faculty = await Faculty.findOne({ _id: id, isDeleted: false })

    if (!faculty) {
        throw new Error("Unable to logIn")
    }

    const isMatch = await bcryptjs.compare(currentPassword, faculty.password)

    if (!isMatch) {
        throw new Error("Invalid Credentials")
    }
    return faculty
}



// generateAuthToken
facultySchema.methods.generateAuthToken = async function () {
    const faculty = this
    const token = jwt.sign({ _id: faculty._id.toString() }, process.env.JWT_SECRET)

    faculty.token = token
    await faculty.save()
    return token
}



// hashing password before saving
facultySchema.pre('save', async function (next) {

    const faculty = this
    if (faculty.isModified('password')) {
        faculty.password = await bcryptjs.hash(faculty.password, 10)
    }
    next()
})


// hashing password before updating
facultySchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' && update.password !== undefined) {
        this.getUpdate().password = await bcryptjs.hash(update.password, 10)

    } else {
        next();
    }
})


const Faculty = mongoose.model('faculty', facultySchema)
module.exports = Faculty