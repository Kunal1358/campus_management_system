const University = require('../models/university')
const validator = require('../middleware/validate')
const idGenerator = require('../utility/idGenerator')


// Get all university
module.exports.getAllUniversities = async () => {

    const universities = await University.aggregate([
        {
            $match: {
                isDeleted: false,
            }
        },
        {
            $project: { universityName: 1, universityId: 1, email: 1 }
        }
    ])

    if (universities.length === 0) {
        throw new Error('Unable to find any university')
    }
    return universities
}





module.exports.profile = async (req) => {

    const universityProfile = await University.aggregate([
        {
            $match: { _id: req.university, isDeleted: false }
        },
        {
            $project: { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0, token: 0 }
        }
    ])

    if (universityProfile.length === 0) {
        throw new Error('Unable to fetch Profile')
    }
    return universityProfile
}




// Sign Up
module.exports.signUp = async (body) => {

    await validator.universitySchema.validateAsync(body)

    const validUniversity = await University.findOne({ email: body.email, isDeleted: false })

    if (validUniversity !== null) {
        throw new Error('email already exists');
    }

    const university = await University.create({
        universityName: body.universityName,
        universityId: `UID_${idGenerator}`,
        email: body.email,
        password: body.password
    })

    return university

}


// Sign in
module.exports.signIn = async (body) => {

    const university = await University.findByCredentials(body.email, body.password)
    if (!university) {
        throw new Error('Invalid username or password')
    }

    const token = await university.generateAuthToken()
    return { university, token }

}


// log 
module.exports.logOut = async (req) => {

    const university = await University.findOneAndUpdate({ _id: req.university, isDeleted: false }, { token: null }, { new: true })
    if (!university) {
        throw new Error('Bad request')
    }
}



// update 
module.exports.update = async (req) => {

    await validator.updateUniversitySchema.validateAsync(req.body)

    const university = await University.findOneAndUpdate({ _id: req.university, isDeleted: false }, req.body, { new: true })

    if (!university) {
        throw new Error('Invalid update request')
    }

    return university

}



module.exports.deleteUniversity = async (id) => {

    const deleted_University = await University.findOneAndUpdate({ id, isDeleted: false }, { isDeleted: true, token: null }, { new: true })

    if (!deleted_University) {
        throw new Error('Bad request')
    }

}