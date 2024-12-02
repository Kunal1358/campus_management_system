const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({

    studentName: {
        type: String,
    },
    studentId: {
        type: String,
    },
    address: {
        type: String,
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
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})



// student login
studentSchema.statics.findByCredentials = async (body) => {

    const { studentId, email, password } = body

    const student = await Student.findOne({ email, studentId, isDeleted: false })
    if (!student) {
        throw new Error("Unable to logIn")
    }

    const isMatch = await bcryptjs.compare(password, student.password)
    if (!isMatch) {
        throw new Error("Invalid Credentials")
    }
    return student
}


// student update password
studentSchema.statics.findByPassword = async (id, currentPassword) => {
    
    const student = await Student.findOne({ _id: id, isDeleted: false })

    if (!student) {
        throw new Error("Unable to logIn")
    }

    const isMatch = await bcryptjs.compare(currentPassword, student.password)

    if (!isMatch) {
        throw new Error("Invalid Credentials")
    }
    return student
}


// generateAuthToken
studentSchema.methods.generateAuthToken = async function () {
    const student = this
    const token = jwt.sign({ _id: student._id.toString() }, process.env.JWT_SECRET)

    student.token = token
    await student.save()
    return token
}





// hashing password before saving
studentSchema.pre('save', async function (next) {

    const student = this
    if (student.isModified('password')) {
        student.password = await bcryptjs.hash(student.password, 10)
    }
    next()
})


// hashing password before updating
studentSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate()
    if (update.password !== '' && update.password !== undefined) {
        this.getUpdate().password = await bcryptjs.hash(update.password, 10)

    } else {
        next()
    }
})



const Student = mongoose.model('student', studentSchema)
module.exports = Student