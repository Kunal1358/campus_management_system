const Subject = require('../models/subject')
const validator = require('../middleware/validate')
const idGenerator = require('../utility/idGenerator')


module.exports.getAllSubjects = async () => {

    const subjects = await Subject.aggregate([
        {
            $match: {
                isDeleted: false,
            }
        },
        {
            $lookup: {
                from: 'universities',
                localField: 'universityId',
                foreignField: '_id',
                "pipeline": [
                    { "$project": { "universityName": 1, "universityId": 1, "email": 1, } }
                ],
                as: 'universityId',
            }
        },
        {
            $lookup: {
                from: 'branches',
                localField: 'branchId',
                foreignField: '_id',
                "pipeline": [
                    { "$project": { "branchName": 1, "branchCode": 1 } }
                ],
                as: 'branchId',
            }
        },
        {
            $project: { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 }
        }
    ])

    if (subjects.length === 0) {
        throw new Error('No Subjects found')
    }
    return subjects
}


module.exports.createSubject = async (body) => {

    await validator.subjectSchema.validateAsync(body)

    const isSubjectSafe = await Subject.find({ subjectName: body.subjectName, universityId: body.universityId, branchId: body.branchId, isDeleted: false })

    if (isSubjectSafe.length > 0) {
        throw new Error('Subject Already exists')
    }

    const subject = await Subject.create({
        subjectName: body.subjectName,
        subjectCode: `SUB_${idGenerator}`,
        universityId: body.universityId,
        branchId: body.branchId,
    })

    if (!subject) {
        throw new Error('Unable to process sign up request. Please try again after some time')
    }
    return subject
}




module.exports.deleteSubject = async (id) => {

    const deleted_subject = await Subject.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })

    if (!deleted_subject) {
        throw new Error('Bad request')
    }
}



module.exports.updateSubject = async (subject_id, body) => {
    
    await validator.updateSubjectSchema.validateAsync(body)


    const subject = await Subject.findOneAndUpdate({ _id: subject_id, isDeleted: false }, body, { new: true })

    if (!subject) {
        throw new Error('Invalid update request')
    }

    return subject
}
