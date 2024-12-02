const Student = require('../models/student')
const mailer = require('../connections/emailConnections')
const passwordGenerator = require('../utility/generateCredentials')
const idGenerator = require('../utility/idGenerator')
const validator = require('../middleware/validate')
const crypto = require('crypto')
const studentResetPasswordTokens = require('../models/studentResetToken')



module.exports.getAllStudents = async () => {

    const students = await Student.aggregate([
        {
            $match: {
                isDeleted: false,
            }
        }
    ])

    if (students.length === 0) {
        throw new Error('No student found')
    }
    return students
}



module.exports.profile = async (req) => {

    const studentProfile = await Student.aggregate([
        {
            $match: { _id: req.student, isDeleted: false }
        },
        {
            $project: { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, token: 0 }
        }
    ])

    if (studentProfile.length === 0) {
        throw new Error('Unable to fetch Profile')
    }
    return studentProfile

}





module.exports.deleteStudent = async (id) => {

    const deleteStudent = await Student.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true, token: null }, { new: true })

    if (!deleteStudent) {
        throw new Error('Bad request')
    }

}




module.exports.updateStudent = async (req) => {

    await validator.updateStudentSchema.validateAsync(req.body)

    const iStudent = await Student.findOne({ email: value, isDeleted: false })

    if (iStudent !== null) {
        throw new Error('email already exists');
    }

    const student = await Student.findOneAndUpdate({ _id: req.student, isDeleted: false }, req.body, { new: true })

    if (!student) {
        throw new Error('Invalid update request')
    }

    return student

}





// sign up
module.exports.createStudent = async (body) => {

    await validator.studentSchema.validateAsync(body)

    // generating uid and password
    const generatedStudentId = idGenerator
    const generatedPassword = passwordGenerator.generatePassword(10)

    const student = await Student.create({
        studentName: body.studentName,
        studentId: 'STU_' + generatedStudentId,
        address: body.address,
        age: body.age,
        universityId: body.universityId,
        branchId: body.branchId,
        mentorId: body.mentorId,
        email: body.email,
        password: generatedPassword
    })

    // Sending mail
    await mailer.StudentMailSender(body.studentName, `STU_${generatedStudentId}`, body.email, generatedPassword)

    if (!student) {
        throw new Error('Could not create student')
    }
    return student
}






// Sign in
module.exports.signIn = async (body) => {

    const student = await Student.findByCredentials(body)
    const token = await student.generateAuthToken()

    if (!student) {
        throw new Error('Invalid username or password')
    }

    return { student, token }

}



// log Out
module.exports.logOut = async (req) => {

    const student = await Student.findOneAndUpdate({ _id: req.student, isDeleted: false }, { token: null }, { new: true })
    if (!student) {
        throw new Error('Bad request')
    }
}


module.exports.changePassword = async (req) => {

    const isStudentValid = await Student.findByPassword(req.student, req.body.currentPassword)
    if (!isStudentValid) {
        throw new Error(`Current password does not match. Please try again later`)
    }

    const student = await Student.findOneAndUpdate({ _id: req.student, isDeleted: false }, { password: req.body.password }, { new: true })
    return student

}



module.exports.resetPassword = async (req) => {

    const student = await Student.findOne({ email: req.body.email, studentId: req.body.studentId, isDeleted: false })

    if (!student) { throw new Error('No user found') }

    const token = await studentResetPasswordTokens.create({
        accessToken: crypto.randomBytes(20).toString("hex"),
        student: student,
        isValid: true,
    })

    const link = `localhost:3000/student/account-recovery/${student._id}/${token.accessToken}`
    await mailer.resetPasswordMailer(student.email, "Student Password Reset", link)
}




module.exports.recoveryAccount = async (req) => {

    const isValidToken = await studentResetPasswordTokens.findOne({ token: req.params.token, isValid: true })

    if (!isValidToken) {
        throw new Error('Invalid request')
    }

    const student = await Student.findOneAndUpdate({ _id: req.params.studentId, isDeleted: false }, { password: req.body.password }, { new: true })
    if (!student) {
        throw new Error('Invalid request')
    }

    isValidToken.isValid = false
    isValidToken.accessToken = null
    await isValidToken.save()

}
