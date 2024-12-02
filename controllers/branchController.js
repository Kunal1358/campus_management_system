const branchService = require('../service/branchService')
const common = require('../utility/common')


module.exports.getAllBranches = async (req, res) => {

    try {
        const branches = await branchService.getAllBranches()
        common.sendSuccess(res, branches)
    } catch (error) {
        common.sendError(res, error.message)

    }
}


module.exports.createBranch = async (req, res) => {

    try {
        const branch = await branchService.createBranch(req.body)
        common.sendSuccess(res, branch)
    } catch (error) {
        common.sendError(res, error.message)
    }
}



module.exports.deleteBranch = async (req, res) => {

    try {
        await branchService.deleteBranch(req.params.id)
        common.sendSuccess(res, 'Branch successfully deleted')
    } catch (error) {
        common.sendError(res, error.message)
    }
}


module.exports.updateBranch = async (req, res) => {

    try {
        const branch = await branchService.updateBranch(req.params.id, req.body)
        common.sendSuccess(res, branch)
    } catch (error) {
        common.sendError(res, error.message)
    }
}
