const Branch = require('../models/branch')
const validator = require('../middleware/validate')
const idGenerator = require('../utility/idGenerator')
const University = require('../models/university')




module.exports.getAllBranches = async () => {

    const branches = await Branch.aggregate([
        {
            $match: {
                isDeleted: false,
            }
        },
        {
            $lookup: {
                from: 'universities', // collection 2 name
                localField: 'universityId', //field name is 1st table
                foreignField: '_id', //Primary key of second table
                "pipeline": [
                    { "$project": { "universityName": 1, "universityId": 1, "email": 1, } }
                ],
                as: 'universityId',
            }
        },
        {
            $project: { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 }
        }
    ])

    if (branches.length === 0) {
        throw new Error('No branches found')
    }
    return branches

}

module.exports.createBranch = async (body) => {

    await validator.branchSchema.validateAsync(body)

    const isBranchSafe = await Branch.find({ branchName: body.branchName, universityId: body.universityId, isDeleted: false })

    if (isBranchSafe.length > 0) {
        throw new Error('Branch Already exists')
    }

    const branch = await Branch.create({
        branchName: body.branchName,
        branchCode: `BID_${idGenerator}`,
        universityId: body.universityId
    })
    if (!branch) {
        throw new Error('Could not create branch')
    }
    return branch

}



module.exports.deleteBranch = async (id) => {

    const deleted_branch = await Branch.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })

    if (!deleted_branch) {
        throw new Error('Bad request')
    }

}


module.exports.updateBranch = async (branch_id, body) => {

    await validator.UpdateBranchSchema.validateAsync(body)


    const branch = await Branch.findOneAndUpdate({ _id: branch_id, isDeleted: false }, body, { new: true })

    if (!branch) {
        throw new Error('Invalid update request')
    }

    return branch

}
