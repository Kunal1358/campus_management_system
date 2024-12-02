const jwt = require('jsonwebtoken')
const University = require('../models/university')
const Faculty = require('../models/faculty')
const Student = require('../models/student')
const common = require('../utility/common')

const generateToken = (req) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    return token
}

const generateDecodedToken = async (token) => {

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken
}


const authenticateUniversity = async (req, res, next) => {

    try {

        const token = generateToken(req)
        const decodedToken = await generateDecodedToken(token)
 
        const university = await University.findOne({ _id: decodedToken._id, token: token})

        if (!university) {
            throw new Error('Unable to Authenticate request')
        }
        req.token = token
        req.university = university._id

        next()

    } catch (error) {
        common.sendError(res, error.message)
        // common.sendError(res, 'Please Authenticate!')
    }

}


const authenticateFaculty = async (req, res, next) => {

    try {

        const token = generateToken(req)
        const decodedToken = await generateDecodedToken(token)

        const faculty = await Faculty.findOne({ _id: decodedToken._id, token: token })

        if (!faculty) {
            throw new Error('Unable to Authenticate request')
        }
        req.token = token
        req.faculty = faculty._id

        next()

    } catch (error) {
        common.sendError(res, 'Please Authenticate!')
    }

}


const authenticateStudent = async (req, res, next) => {

    try {

        const token = generateToken(req)
        const decodedToken = await generateDecodedToken(token)

        const student = await Student.findOne({ token: token })

        if (!student) {
            throw new Error()
        }
        req.token = token
        req.student = student._id

        next()

    } catch (error) {
        common.sendError(res, 'Please Authenticate!')
    }
}



module.exports = {
    authenticateUniversity,
    authenticateFaculty,
    authenticateStudent
}