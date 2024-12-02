const facultyService = require('../service/facultyService')
const common = require('../utility/common')



module.exports.getAllFaculty = async (req, res) => {

    try {

        const Faculties = await facultyService.getAllFaculty()
        common.sendSuccess(res, Faculties)

    } catch (error) {
        common.sendError(res, error.message)
    }
}



module.exports.updateFaculty = async (req, res) => {

    try {

        const faculty = await facultyService.updateFaculty(req)
        common.sendSuccess(res, faculty)

    } catch (error) {
        common.sendError(res, error.message)
    }

}


module.exports.profile = async (req, res) => {

    try {

        const profile = await facultyService.profile(req)
        common.sendSuccess(res, profile)

    } catch (error) {
        common.sendError(res, error.message)
    }
}



module.exports.deleteFaculty = async (req, res) => {

    try {

        await facultyService.deleteFaculty(req.faculty)
        common.sendSuccess(res, 'Faculty successfully deleted')

    } catch (error) {
        common.sendError(res, error.message)
    }

}



// Sign Up
module.exports.createFaculty = async (req, res) => {

    try {

        await facultyService.createFaculty(req.body)
        common.sendSuccess(res, 'Faculty created successfully. Login credentials are send to your registered email address.')

    } catch (error) {
        common.sendError(res, error.message)
    }
}



// Sign in
module.exports.signIn = async (req, res) => {

    try {
        const university = await facultyService.signIn(req.body)
        common.sendSuccess(res, university)

    } catch (error) {
        common.sendError(res, error.message)
    }

}


// logOut
module.exports.logOut = async (req, res) => {

    try {

        const university = await facultyService.logOut(req)
        common.sendSuccess(res, 'You have been logged out successfully!')

    } catch (error) {
        common.sendError(res, error.message)
    }

}



module.exports.changePassword = async (req, res) => {

    try {

        const student = await facultyService.changePassword(req)
        common.sendSuccess(res, student)

    } catch (error) {
        common.sendError(res, error.message)
    }
}


module.exports.resetPassword = async (req, res) => {

    try {

        await facultyService.resetPassword(req)
        common.sendSuccess(res, 'Recovery link has been reset successfully send to your email address')

    } catch (error) {
        common.sendError(res, error.message)
    }

}


module.exports.recoveryAccount = async (req, res) => {

    try {

        await facultyService.recoveryAccount(req)
        common.sendSuccess(res, 'Password successfully updated. Please log in')

    } catch (error) {
        common.sendError(res, error.message)
    }

}




module.exports.addSubject = async (req, res) => {

    try {
        await facultyService.addSubject(req)
        common.sendSuccess(res, 'Subject added successfully')
    } catch (error) {
        common.sendError(res, error.message)
    }
}

module.exports.deleteSubject = async (req, res) => {

    try {
        await facultyService.deleteSubject(req.params.id)
        common.sendSuccess(res, 'Subject deleted successfully')
    } catch (error) {
        common.sendError(res, error.message)
    }
}