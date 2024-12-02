const studentService = require('../service/studentService')
const common = require('../utility/common')


module.exports.getAllStudents = async (req, res) => {

    try {

        const Students = await studentService.getAllStudents()
        common.sendSuccess(res, Students)

    } catch (error) {
        common.sendError(res, error.message)
    }
}


module.exports.updateStudent = async (req, res) => {

    try {

        const student = await studentService.updateStudent(req)
        common.sendSuccess(res, student)

    } catch (error) {
        common.sendError(res, error.message)
    }
}




module.exports.deleteStudent = async (req, res) => {

    try {
        await studentService.deleteStudent(req.student)
        common.sendSuccess(res, 'Successfully deleted')

    } catch (error) {
        common.sendError(res, error.message)
    }
}





// Sign Up
module.exports.createStudent = async (req, res) => {

    try {
        const student = await studentService.createStudent(req.body)
        common.sendSuccess(res, student)

    } catch (error) {
        common.sendError(res, error.message)
    }
}



// Sign in
module.exports.signIn = async (req, res) => {

    try {
        const student = await studentService.signIn(req.body)
        common.sendSuccess(res, student)

    } catch (error) {
        common.sendError(res, error.message)
    }
}


// logOut
module.exports.logOut = async (req, res) => {

    try {

        await studentService.logOut(req)
        common.sendSuccess(res, 'You have been logged out successfully!')

    } catch (error) {
        common.sendError(res, error.message)
    }
}


module.exports.studentProfile = async (req, res) => {

    try {

        const student = await studentService.profile(req)
        common.sendSuccess(res, student)

    } catch (error) {
        common.sendError(res, error.message)
    }
}


module.exports.changePassword = async (req, res) => {

    try {

        const student = await studentService.changePassword(req)
        common.sendSuccess(res, student)

    } catch (error) {
        common.sendError(res, error.message)
    }
}


module.exports.resetPassword = async (req, res) => {

    try {

        await studentService.resetPassword(req)
        common.sendSuccess(res, 'Recovery link has been reset successfully send to your email address')

    } catch (error) {
        common.sendError(res, error.message)
    }

}


module.exports.recoveryAccount = async (req, res) => {

    try {

        await studentService.recoveryAccount(req)
        common.sendSuccess(res, 'Password successfully updated. Please log in')

    } catch (error) {
        common.sendError(res, error.message)
    }

}