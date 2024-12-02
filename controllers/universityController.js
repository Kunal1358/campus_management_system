const universityService = require('../service/universityService')
const common = require('../utility/common')
const University = require('../models/university')




module.exports.getAllUniversities = async (req, res) => {

    try {

        const data = await universityService.getAllUniversities()
        common.sendSuccess(res, data)

    } catch (error) {
        common.sendError(res, error.message)
    }
}



// Sign Up
module.exports.signUp = async (req, res) => {

    try {
        await universityService.signUp(req.body)
        // common.sendSuccess(res, uni)

        common.sendSuccess(res, 'University Created Successfully !!! Kindly Login.')

    } catch (error) {
        common.sendError(res, error.message)
    }

}


// Sign in
module.exports.signIn = async (req, res) => {

    try {
        const university = await universityService.signIn(req.body)
        common.sendSuccess(res, university)

    } catch (error) {
        common.sendError(res, error.message)
    }

}


module.exports.profile = async (req, res) => {

    try {

        const profile = await universityService.profile(req)
        common.sendSuccess(res, profile)

    } catch (error) {
        common.sendError(res, error.message)
    }

}



// logOut
module.exports.deleteUniversity = async (req, res) => {

    try {

        await universityService.deleteUniversity(req.university)
        common.sendSuccess(res, 'University Successfully Deleted')

    } catch (error) {
        common.sendError(res, error.message)
    }

}



// logOut
module.exports.logOut = async (req, res) => {

    try {

        const university = await universityService.logOut(req)
        common.sendSuccess(res, 'You have been logged out successfully!')

    } catch (error) {
        common.sendError(res, error.message)
    }

}


// logOut
// module.exports.logOutAll = async (req, res) => {

//     try {
//         const university = await universityService.logOutAll(req)
//         common.sendSuccess(res, university)

//     } catch (error) {
//         common.sendError(res, error.message)
//     }

// }


// logOut
module.exports.update = async (req, res) => {

    try {

        const university = await universityService.update(req)
        common.sendSuccess(res, university)

    } catch (error) {
        common.sendError(res, error.message)
    }

}