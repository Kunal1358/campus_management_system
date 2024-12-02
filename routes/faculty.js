const express = require('express')
const router = new express.Router()

const auth = require('../middleware/auth')
const facultyController = require('../controllers/facultyController')



router.get('/all', auth.authenticateFaculty, facultyController.getAllFaculty)

router.delete('/delete', auth.authenticateFaculty, facultyController.deleteFaculty)

router.put('/update', auth.authenticateFaculty, facultyController.updateFaculty)

router.get('/profile', auth.authenticateFaculty, facultyController.profile)

router.post('/signIn', facultyController.signIn)

router.post('/signUp', facultyController.createFaculty) // change add auth middleware

router.post('/logout', auth.authenticateFaculty, facultyController.logOut)

router.post('/change-password', auth.authenticateStudent, facultyController.changePassword)

router.post('/reset-password', auth.authenticateStudent, facultyController.resetPassword)

router.post('/account-recovery/:facultyId/:token', auth.authenticateStudent, facultyController.recoveryAccount)




router.post('/add-subject', auth.authenticateFaculty, facultyController.addSubject)

router.post('/delete-subject/:id', auth.authenticateFaculty, facultyController.deleteSubject)















module.exports = router