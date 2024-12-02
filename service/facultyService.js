const Faculty = require('../models/faculty')
const mailer = require('../connections/emailConnections')
const passwordGenerator = require('../utility/generateCredentials')
const idGenerator = require('../utility/idGenerator')
const validator = require('../middleware/validate')
const facultyResetPasswordTokens = require('../models/facultyResetToken')
const crypto = require('crypto')
const FacultySubject = require('../models/facultySubjects')


module.exports.getAllFaculty = async () => {

    const faculties = await Faculty.aggregate([
        {
            $match: {
                isDeleted: false,
            }
        },
        {
            $project: { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, token: 0 },
        }
    ])

    if (faculties.length === 0) {
        throw new Error('No faculty found!')
    }
    return faculties
}


module.exports.createFaculty = async (body) => {

    await validator.facultySchema.validateAsync(body)
    const isFaculty = await Faculty.findOne({ email: email, isDeleted: false });

    if (isFaculty !== null) {
        throw new Error('email already exists');
    }

    // generating uid and password
    const generatedFacultyId = idGenerator
    const generatedPassword = passwordGenerator.generatePassword(10)

    const faculty = await Faculty.create({
        facultyName: body.facultyName,
        facultyId: `FAC_${generatedFacultyId}`,
        age: body.age,
        universityId: body.universityId,
        branchId: body.branchId,
        email: body.email,
        password: generatedPassword
    })

    if (!faculty) {
        throw new Error('Could not create Faculty')
    }

    // Sending mail
    await mailer.facultyMailSender(body.facultyName, `FAC_${generatedFacultyId}`, body.email, generatedPassword)

    return faculty
}



// delete faculty
module.exports.deleteFaculty = async (id) => {

    const deleteFaculty = await Faculty.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true, token: null }, { new: true })

    if (!deleteFaculty) {
        throw new Error('Bad request')
    }

}



// update faculty
module.exports.updateFaculty = async (req) => {

    await validator.updateFacultySchema.validateAsync(req.body)

    const faculty = await Faculty.findOneAndUpdate({ _id: req.faculty, isDeleted: false }, req.body, { new: true })

    if (!faculty) {
        throw new Error('Invalid update request')
    }

    return faculty

}


// Sign in
module.exports.signIn = async (body) => {

    const faculty = await Faculty.findByCredentials(body)
    const token = await faculty.generateAuthToken()

    if (!faculty) {
        throw new Error('Invalid username or password')
    }

    return { faculty, token }

}



// logout
module.exports.logOut = async (req) => {

    const faculty = await Faculty.findOneAndUpdate({ _id: req.faculty, isDeleted: false }, { token: null }, { new: true })
    if (!faculty) {
        throw new Error('Bad request')
    }

}


// Profile
module.exports.profile = async (req) => {

    const facultyProfile = await Faculty.findOne({ _id: req.faculty, isDeleted: false }).populate('facultySubjects')
    return facultyProfile
}




// Change Password
module.exports.changePassword = async (req) => {

    const isFacultyValid = await Faculty.findByPassword(req.faculty, req.body.currentPassword)
    if (!isFacultyValid) {
        throw new Error(`Current password does not match. Please try again later`)
    }

    const faculty = await Faculty.findOneAndUpdate({ _id: req.faculty, isDeleted: false }, { password: req.body.password }, { new: true })
    return faculty

}


// reset password
module.exports.resetPassword = async (req) => {

    const faculty = await Faculty.findOne({ email: req.body.email, facultyId: req.body.facultyId, isDeleted: false })

    if (!faculty) { throw new Error('No faculty found') }

    const token = await facultyResetPasswordTokens.create({
        accessToken: crypto.randomBytes(20).toString("hex"),
        faculty: faculty,
        isValid: true,
    })

    const link = `localhost:3000/faculty/account-recovery/${faculty._id}/${token.accessToken}`
    await mailer.resetPasswordMailer(faculty.email, "Faculty Password Reset", link)
}



// recover account
module.exports.recoveryAccount = async (req) => {

    const isValidToken = await facultyResetPasswordTokens.findOne({ token: req.params.token, isValid: true })

    if (!isValidToken) {
        throw new Error('Invalid request')
    }

    const faculty = await Faculty.findOneAndUpdate({ _id: req.params.facultyId, isDeleted: false }, { password: req.body.password }, { new: true })
    if (!faculty) {
        throw new Error('Invalid request')
    }

    isValidToken.isValid = false
    isValidToken.accessToken = null
    await isValidToken.save()

}



module.exports.addSubject = async (req) => {
    const facultySubject = await FacultySubject.create(req.body)
    if (!facultySubject) {
        throw new Error('Unable to create subject')
    }
}

module.exports.deleteSubject = async (id) => {
    const facultySubject = await FacultySubject.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
    if (!facultySubject) {
        throw new Error('Unable to delete subject')
    }
}