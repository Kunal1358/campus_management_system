const express = require('express')
const router = new express.Router()

const auth = require('../middleware/auth')
const studentController = require('../controllers/studentController')



router.get('/all', auth.authenticateStudent, studentController.getAllStudents)

router.post('/create', studentController.createStudent)

router.delete('/delete', auth.authenticateStudent, studentController.deleteStudent)

router.put('/update', auth.authenticateStudent, studentController.updateStudent)

router.post('/signIn', studentController.signIn)

router.post('/signUp', studentController.createStudent)

router.get('/profile', auth.authenticateStudent, studentController.studentProfile)

router.post('/logout', auth.authenticateStudent, studentController.logOut)

router.post('/change-password', auth.authenticateStudent, studentController.changePassword)

router.post('/reset-password', auth.authenticateStudent, studentController.resetPassword)

router.post('/account-recovery/:studentId/:token', auth.authenticateStudent, studentController.recoveryAccount)












module.exports = router