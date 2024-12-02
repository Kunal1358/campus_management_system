const subjectService = require('../service/subjectService')
const common = require('../utility/common')


module.exports.getAllSubjects = async (req, res) => {

    try {

        const subjects = await subjectService.getAllSubjects()
        common.sendSuccess(res, subjects)

    } catch (error) {
        common.sendError(res, error.message)
    }
}


module.exports.createSubject = async (req, res) => {

    try {

        const subject = await subjectService.createSubject(req.body)
        common.sendSuccess(res, subject)

    } catch (error) {
        common.sendError(res, error.message)
    }
}



module.exports.updateSubject = async (req, res) => {

    try {

        const subject = await subjectService.updateSubject(req.params.id, req.body)
        common.sendSuccess(res, subject)

    } catch (error) {
        common.sendError(res, error.message)
    }

}



module.exports.deleteSubject = async (req, res) => {

    try {
        await subjectService.deleteSubject(req.params.id)
        common.sendSuccess(res, 'Subject deleted successfully!')

    } catch (error) {
        common.sendError(res, error.message)
    }

}
