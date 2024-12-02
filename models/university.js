const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const universitySchema = new mongoose.Schema({

    universityName: {
        type: String,
    },
    universityId: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})




// logging in user
universitySchema.statics.findByCredentials = async (email, password) => {

    const university = await University.findOne({ email, isDeleted: false })

    if (!university) {
        throw new Error('Invalid username or password')
    }
    const isMatch = await bcryptjs.compare(password, university.password)
    if (!isMatch) {
        throw new Error("Unable to logIn")
    }
    return university

}


// generating auth token
universitySchema.methods.generateAuthToken = async function () {
    const university = this

    const token = jwt.sign({ _id: university._id.toString() }, process.env.JWT_SECRET)

    // await university.updateOne({ token: token }, { new: true })
    university.token = token
    await university.save()
    return token
}


// hashing password before saving
universitySchema.pre('save', async function (next) {

    const university = this
    if (university.isModified('password')) {
        university.password = await bcryptjs.hash(university.password, 10)
    }
    next()
})


// hashing password before updating
universitySchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' && update.password !== undefined) {
        this.getUpdate().password = await bcryptjs.hash(update.password, 10)

    } else {
        next();
    }
})



const University = mongoose.model('university', universitySchema)
module.exports = University